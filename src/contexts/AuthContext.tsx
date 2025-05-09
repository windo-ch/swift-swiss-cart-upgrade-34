import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Session, User, Provider } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithSocial: (provider: Provider) => Promise<void>;
  loading: boolean;
  isFirstTimeUser: boolean;
  hasAppliedDiscount: boolean;
  applyFirstTimeDiscount: () => Promise<void>;
  isAuthenticated: boolean;
}

// Define the expected return types for our queries to fix type issues
type OrdersType = {
  id: string;
  user_id: string;
}[];

type UserDiscountType = {
  id: string;
  user_id: string;
  discount_code: string;
  discount_percent: number;
  is_used: boolean;
  valid_until: string | null;
}[];

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);
  const [hasAppliedDiscount, setHasAppliedDiscount] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        if (event === 'SIGNED_IN') navigate('/');
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Current session:", session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      
      // Check if this is a first-time user
      if (session?.user) {
        checkFirstTimeUser(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  // Check if this is a first-time user with no previous orders
  const checkFirstTimeUser = async (userId: string) => {
    try {
      // Use explicit type for orders query with .returns<>
      const { data: orders } = await supabase
        .from('orders')
        .select('id')
        .eq('user_id', userId)
        .limit(1)
        .returns<OrdersType>();
        
      // If no orders, check if discount already applied
      if (!orders || orders.length === 0) {
        // Use explicit type for discounts query with .returns<>
        const { data: discounts } = await supabase
          .from('user_discounts')
          .select('id')
          .eq('user_id', userId)
          .eq('discount_code', 'FIRSTTIME')
          .limit(1)
          .returns<UserDiscountType>();
          
        setIsFirstTimeUser(true);
        setHasAppliedDiscount(discounts !== null && discounts.length > 0);
      }
    } catch (error) {
      console.error('Error checking first time user status:', error);
    }
  };

  // Apply the first-time discount
  const applyFirstTimeDiscount = async () => {
    if (!user || !isFirstTimeUser || hasAppliedDiscount) return;
    
    try {
      const { error } = await supabase
        .from('user_discounts')
        .insert({
          user_id: user.id,
          discount_code: 'FIRSTTIME',
          discount_percent: 10,
          is_used: false,
          valid_until: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
        })
        .returns<{id: string}>();
        
      if (error) throw error;
      
      setHasAppliedDiscount(true);
    } catch (error) {
      console.error('Error applying discount:', error);
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
  };

  const signInWithSocial = async (provider: Provider) => {
    const { error } = await supabase.auth.signInWithOAuth({ 
      provider,
      options: {
        redirectTo: window.location.origin
      }
    });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    navigate('/auth');
  };

  return (
    <AuthContext.Provider value={{ 
      session, 
      user, 
      signIn, 
      signUp, 
      signOut,
      signInWithSocial, 
      loading,
      isFirstTimeUser,
      hasAppliedDiscount,
      applyFirstTimeDiscount,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Facebook, Twitter, Mail } from 'lucide-react';
import type { Provider } from '@supabase/supabase-js';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, signInWithSocial, user } = useAuth();
  const { toast } = useToast();

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        await signUp(email, password);
        toast({
          title: "Konto erstellt",
          description: "Bitte überprüf dini E-Mail zum Bestätige vom Konto.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Fehler",
        description: error instanceof Error ? error.message : "Es isch en Fehler passiert",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: Provider) => {
    try {
      await signInWithSocial(provider);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Fehler",
        description: error instanceof Error ? error.message : "Es isch en Fehler passiert",
      });
    }
  };

  // Test account for demo
  const useTestAccount = () => {
    setEmail('test@brings.ch');
    setPassword('test1234');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img 
            src="/lovable-uploads/e526c616-4ec5-42f8-8ae8-476c840f320e.png"
            alt="Logo" 
            className="mx-auto h-12 w-auto"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isLogin ? 'Amelde' : 'Neues Konto erstelle'}
          </h2>
          <p className="text-center text-sm text-gray-600 mt-2">
            {isLogin ? 'Meld dich a zum produkt bestelle' : 'Erstell es Konto zum schneller bestelle'}
          </p>
        </div>

        {/* Social Login Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleSocialLogin('google')}
            className="w-full"
          >
            <img 
              src="/lovable-uploads/80c228b4-813c-499f-b601-34324112c42f.png" 
              alt="Google"
              className="h-5 w-5 mr-2"
            />
            Google
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => handleSocialLogin('facebook')}
            className="w-full"
          >
            <Facebook className="mr-2 h-5 w-5" />
            Facebook
          </Button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-50 text-gray-500">Oder mit E-Mail</span>
          </div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">E-Mail Adressä</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="dini@email.ch"
              />
            </div>
            <div>
              <Label htmlFor="password">Passwort</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Ladä...' : isLogin ? 'Ameldä' : 'Konto erstellä'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsLogin(!isLogin)}
              className="w-full"
            >
              {isLogin ? "Keis Konto? Jetzt registrierä" : "Scho es Konto? Ameldä"}
            </Button>
            
            {/* Test Account Button - for demo purposes */}
            <Button
              type="button"
              variant="link"
              onClick={useTestAccount}
              className="w-full text-brings-primary"
            >
              Demo-Konto verwende (für Test)
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;

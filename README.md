# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/2511b236-e35c-4f41-80ed-171132621010

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/2511b236-e35c-4f41-80ed-171132621010) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/2511b236-e35c-4f41-80ed-171132621010) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes it is!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)


## Delivery Information

### Delivery Times
The app has a general delivery time of 10-30 minutes, with specific times for each district (Kreis):

- Kreis 1: 20 minutes
- Kreis 2: 25 minutes
- Kreis 3: 20 minutes
- Kreis 4: 15 minutes
- Kreis 5: 10 minutes (Fastest delivery area)
- Kreis 6: 20 minutes
- Kreis 7: 30 minutes
- Kreis 8: 20 minutes
- Kreis 9: 30 minutes
- Kreis 10: 30 minutes
- Kreis 11: 30 minutes
- Kreis 12: 30 minutes

Hotspot areas receive priority service with a 10-minute delivery time.

### Product Catalog
The app features a diverse product range organized into several categories:

1. **Soft Drinks & Water**
   - Various waters (Valser, Lauretana) - CHF 2.50-3.50
   - Ice teas (AriZona, San Benedetto) - CHF 2.50-6.50
   - Sodas (Coca-Cola, Fanta) - CHF 2.50-5.90
   - Energy drinks (Red Bull) - CHF 3.50

2. **Chips & Snacks**
   - Chips (Zweifel, Fonzies) - CHF 4.90
   - Chocolate/Sweet snacks (Kinder products, Oreo) - CHF 0.70-4.90
   - Savory snacks (Grissini, TUC crackers) - CHF 2.90-5.90

3. **Non-Food Items**
   - Baby products - CHF 5.50
   - Paper products - CHF 2.20-4.90
   - Personal care items - CHF 3.90
   - Disposable tableware - CHF 0.30

4. **Age-Restricted Products (18+)**
   - Tobacco products - CHF 2.50-13.90
   - Alcoholic beverages:
     - Beers - CHF 2.50-3.90
     - Wine - CHF 4.20
     - Spirits - CHF 26.00-49.00

## Optimization Suggestions

### Backend Improvements
1. **Database Structure:**
   - Create a dedicated products table in Supabase instead of using local storage
   - Add inventory tracking capabilities for real-time stock management
   - Implement proper auditing for order status changes

2. **Order Processing:**
   - Add automated delivery time calculation based on district and order volume
   - Implement order batching for delivery optimization
   - Create API endpoints for real-time order status updates

3. **User Authentication:**
   - Improve password reset flow with proper email templates
   - Add SMS verification for delivery confirmations
   - Implement secure payment processing integration

### Customer Experience
1. **Checkout Process:**
   - Save user addresses for quicker repeat ordering
   - Offer estimated delivery time before checkout completion
   - Add progress tracking for orders in real-time

2. **Product Management:**
   - Implement filter and sort options for product browsing
   - Add personalized recommendations based on order history
   - Enable product availability notifications

3. **District-Based Features:**
   - Show actual delivery time estimates based on district selection
   - Offer district-specific promotions
   - Display delivery radius map visualization

### Admin Dashboard
1. **Order Management:**
   - Create a mobile-optimized view for delivery personnel
   - Implement batch order processing
   - Add route optimization for multiple deliveries

2. **Inventory Management:**
   - Real-time inventory tracking and alerts
   - Automated restock notifications
   - Sales trend analysis by product category

3. **Analytics:**
   - Track popular products by district and time
   - Delivery time performance metrics
   - Revenue and order volume dashboards

### Technical Infrastructure
1. **Performance:**
   - Implement proper caching strategies for product data
   - Optimize image loading with responsive sizing
   - Enhance offline capabilities for delivery personnel

2. **Security:**
   - Strengthen Supabase RLS policies
   - Implement proper error logging and monitoring
   - Add age verification for restricted products

3. **Scalability:**
   - Prepare infrastructure for high-volume periods
   - Implement queue management for order processing
   - Create backup and recovery protocols

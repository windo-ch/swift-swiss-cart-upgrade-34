# Product Synchronization Fix Instructions

This document provides instructions for fixing the product synchronization issue between the database and the admin interface.

## Problem Description

The application currently has a discrepancy between:
1. Products stored in the Supabase database (used by the "Products" page)
2. Products stored in localStorage (used by the Admin Dashboard)

This causes confusion and inconsistency as changes made in the admin dashboard don't affect what users see in the store, and vice versa.

## Solution Steps

### 1. Run the SQL Script in Supabase

1. Log into your Supabase dashboard
2. Navigate to the SQL Editor
3. Copy the entire contents of the `seed-correct-products.sql` file
4. Paste it into the SQL Editor
5. Run the script (this will delete all existing products and insert the 64 correct ones)
6. Verify the script ran successfully by checking the output of the `SELECT COUNT(*) FROM products;` command at the end

### 2. Synchronize localStorage Products with Database

**Option A: Using the Diagnostic Page (Recommended)**

1. Start the application locally using `npm run dev`
2. Navigate to `/diagnostic` in your browser
3. Click the "Sync DB Products to localStorage" button
4. Verify the products have been synchronized by checking the product counts in the diagnostic information

**Option B: Using Browser Console**

1. Start the application locally using `npm run dev`
2. Navigate to any page in your browser
3. Open the browser developer tools (F12 or right-click > Inspect)
4. Go to the Console tab
5. Copy and paste the following code:

```javascript
fetch('/api/products')
  .then(r => r.json())
  .then(products => {
    const adminProducts = products.map(p => ({
      id: p.id,
      name: p.name,
      price: p.price,
      category: p.category,
      description: p.description || '',
      image: p.image || 'https://brings-delivery.ch/cdn/shop/files/placeholder-product_600x.png',
      ageRestricted: p.agerestricted || false,
      stock: p.stock || 50
    }));
    localStorage.setItem('adminProducts', JSON.stringify(adminProducts));
    alert(`Synchronized ${adminProducts.length} products!`);
  })
  .catch(err => alert(`Error: ${err.message}`));
```

6. Press Enter to execute the code
7. You should see an alert showing the number of products synchronized

### 3. Verify Fix

1. Navigate to `/products` to verify the products appear correctly in the store
2. Navigate to `/admin-super-direct` to check the admin dashboard
3. Verify product counts match on both pages
4. Verify products have correct names, prices, and categories

## Long-term Fix

To prevent this issue from recurring in the future, it's recommended to:

1. **Modify the Admin Dashboard code** to use the database directly instead of localStorage
2. **Add automatic synchronization code** to ensure localStorage products stay in sync with the database
3. **Use the database as the single source of truth** for all product data

## Troubleshooting

If you encounter issues:

1. **Database Products Not Showing**: Check Supabase connection settings and ensure products were created successfully in the database
2. **Admin Products Not Updated**: Make sure localStorage was updated correctly by checking browser storage
3. **Image Issues**: Verify that the Supabase storage bucket for product images exists and is publicly accessible

For additional diagnostics, use the `/diagnostic` page which provides detailed information about both data sources. 
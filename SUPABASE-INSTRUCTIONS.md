# Adding District Column to Orders Table

Follow these steps to add the district column to your orders table in Supabase:

## Option 1: Using the Supabase SQL Editor (Simple)

1. Log in to your Supabase project dashboard: https://app.supabase.io/
2. Go to the SQL Editor in the left-hand menu
3. Create a new query or open an empty one
4. Copy and paste the following SQL:

```sql
-- Add district column to orders table
ALTER TABLE orders ADD COLUMN district TEXT;

-- Add comment to explain the column
COMMENT ON COLUMN orders.district IS 'The delivery district selected by the customer';
```

5. Click "Run" to execute the SQL
6. Verify the column was added by going to the "Table Editor" and selecting the "orders" table

## Option 2: Using Supabase Migrations (Advanced)

If you're using Supabase migrations in your development workflow:

1. Add the `add-district-to-orders.sql` file to your migrations folder
2. Run your migration command according to your setup (e.g., using Supabase CLI)

```bash
supabase migration up
```

## Verification

To verify the migration was successful:

1. Go to the Table Editor
2. Select the "orders" table
3. You should see the new "district" column
4. Try placing a test order to confirm it works

## Troubleshooting

If you encounter errors:

1. Check if the column already exists (the ALTER TABLE statement will fail if it does)
2. Ensure you have the necessary permissions to modify the table
3. If using the Supabase CLI, make sure you're connected to the right project 
const path = require('path');
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') });

const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Create admin client with service role key for user creation
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function seedAdminUser() {
  try {
    console.log('Creating admin user...')

    // Create user with admin role
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: 'admin@cloudfloo.io',
      password: 'Admin123!',
      email_confirm: true,
      user_metadata: {
        full_name: 'CloudFloo Admin'
      }
    })

    if (authError) {
      if (authError.message.includes('already registered')) {
        console.log('Admin user already exists, updating profile...')
        
        // Get existing user
        const { data: existingUser } = await supabase.auth.admin.listUsers()
        const adminUser = existingUser.users.find((u: { email: string; }) => u.email === 'admin@cloudfloo.io')
        
        if (adminUser) {
          // Update profile to admin role
          const { error: profileError } = await supabase
            .from('profiles')
            .upsert({
              id: adminUser.id,
              email: 'admin@cloudfloo.io',
              full_name: 'CloudFloo Admin',
              role: 'admin',
              is_active: true
            })

          if (profileError) {
            console.error('Error updating profile:', profileError)
          } else {
            console.log('✅ Admin user profile updated successfully')
          }
        }
        return
      } else {
        throw authError
      }
    }

    if (authData.user) {
      console.log('✅ Admin user created successfully:', authData.user.email)
      
      // Update the profile to admin role
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ role: 'admin' })
        .eq('id', authData.user.id)

      if (profileError) {
        console.error('Error updating profile role:', profileError)
      } else {
        console.log('✅ Admin role assigned successfully')
      }
    }

  } catch (error) {
    console.error('Error creating admin user:', error)
  }
}

// Run the seed function
seedAdminUser().then(() => {
  console.log('Seed script completed')
  process.exit(0)
}).catch((error) => {
  console.error('Seed script failed:', error)
  process.exit(1)
}) 
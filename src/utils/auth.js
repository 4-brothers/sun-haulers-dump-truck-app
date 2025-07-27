// auth.js - simulate authentication logic
export async function loginUser(username, password) {
  // For a demo, we return roles based on username:
  // admin -> 'admin'
  // driver -> 'driver'
  // customer -> 'customer'
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'admin' && password === 'admin') {
        resolve('admin');
      } else if (username === 'driver' && password === 'driver') {
        resolve('driver');
      } else if (username === 'customer' && password === 'customer') {
        resolve('customer');
      } else {
        reject('Invalid credentials');
      }
    }, 500);
  });
}

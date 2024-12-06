let user = {
    name: "Alice",
    address: {
      city: "Wonderland"
    }
};

console.log(user.address?.city);    // Output: "Wonderland"
console.log(user.address?.zipCode); // Output: undefined
console.log(user.profile?.age);  


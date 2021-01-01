module.exports = {
  add(cart, id) {
    cart.push(id);
  },

  check(cart, id){
    return cart.includes(id);
  },

  del(cart, id) {
    for (let i = cart.length - 1; i >= 0; i--) {
      if (id === cart[i]) {
        cart.splice(i, 1);
        return;
      }
    }
  },

  getNumberOfItems(cart) {
    let ret = 0;
    for (ci of cart) {
      ret += 1;
    }

    return ret;
  }
};

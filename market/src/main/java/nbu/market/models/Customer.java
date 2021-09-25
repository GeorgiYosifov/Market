package nbu.market.models;

public class Customer {
    public String Id;
    public Cart Cart;

    public Customer(String id) {
        this.Id = id;
        this.Cart = new Cart();
    }
}

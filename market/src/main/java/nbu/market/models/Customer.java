package nbu.market.models;

public class Customer {
    public String Id;
    public Double Money;
    public Cart Cart;

    public Customer() {}

    public Customer(String id, Double money) {
        this.Id = id;
        this.Money = money;
        this.Cart = new Cart();
    }
}

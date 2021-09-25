package nbu.market.models;

import java.util.Date;
import java.util.concurrent.TimeUnit;

public class Product {
    public String Id;
    public String Name;
    public Double Price;
    public String Category;
    public Date ExpireOn;
    public int Quantity;

    public Product(String id, String name, Double price, String category, int quantity) {
        this.Id = id;
        this.Name = name;
        this.Price = price;
        this.Category = category;
        this.ExpireOn = new Date(System.currentTimeMillis() + TimeUnit.MINUTES.toMillis(5));
        this.Quantity = quantity;
    }
}

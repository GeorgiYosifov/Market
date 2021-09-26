package nbu.market.controllers;

import java.util.ArrayList;
import java.util.Date;
import java.io.IOException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter.SseEventBuilder;

import nbu.market.models.Customer;
import nbu.market.models.Product;

@CrossOrigin(origins = "http://127.0.0.1:5500")
@RestController
@RequestMapping("/api")
public class Market {

    private final Customer[] Customers = new Customer[] {
        new Customer("1", 5.0),
        new Customer("2", 10.0),
        new Customer("3", 7.0),
    };

    private ArrayList<Product> Products = new ArrayList<Product>() {
        {
            add(new Product("123", "apple", 1.0, "nutritious", 2));
            add(new Product("321", "meat", 10.0, "nutritious", 5));
            add(new Product("213", "shampoo", 5.0, "non-nutritious", 2));
        }
    };

    private ArrayList<Product> Cart = new ArrayList<Product>();

    @GetMapping("/priceReducer")
    public SseEmitter priceReducer() 
    {
        SseEmitter emitter = new SseEmitter();
        ExecutorService executor = Executors.newSingleThreadExecutor();
        executor.execute(() -> 
        {
            try {
                for(Product p : this.Products) {
                    randomDelay();
                    SseEventBuilder eventBuilder = SseEmitter.event();
                    if (p.ExpireOn.after(new Date())) {
                        p.Price -= 0.1;
                        emitter.send(eventBuilder
                                    .data(p)
                                    .name("reduce")
                                    .id(String.valueOf(p.hashCode())));
                    } else {
                        this.Products.remove(p);
                        emitter.send(eventBuilder
                                    .data(p)
                                    .name("remove")
                                    .id(String.valueOf(p.hashCode())));
                    }
                }
                emitter.complete();
            } catch (IOException e) {
                emitter.completeWithError(e);
            }
        });
        executor.shutdown();
        return emitter;
    }
 
    private void randomDelay() {
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    @GetMapping("/products")
    public ArrayList<Product> getAllProducts() {
        return this.Products;
    }

    @GetMapping("/customer/{id}")
    public Customer getCustomer(@PathVariable String id) {
        Customer result = new Customer();
        for (Customer c : this.Customers) {
            if (c.Id.equals(id))
                result = c;
        }
        return result;
    }

    @PostMapping("/product")
    public HttpStatus addToCart(@RequestBody Product product) {
        for (Product p : this.Products) {
            if (p.Id.equals(product.Id))
                p.Quantity--;
        }

        for (Product p : this.Cart) {
            if (p.Id.equals(product.Id))
                p.Quantity++;
            else {
                Product newProductForCart = new Product(product.Id, product.Name, product.Price, product.Category, 1);
                this.Cart.add(newProductForCart);
                break;
            }
        }
            
        return HttpStatus.ACCEPTED;
    }    
}

 // @RequestParam String text
 
// @RequestMapping(value="/resource-uri", method=RequestMethod.GET)
    // public SseEmitter handle() 
    // {
    //     SseEmitter emitter = new SseEmitter();
        
    //     SseEventBuilder eventBuilder = SseEmitter.event();
 
    //     String data = "goshe";

    //     try {
    //         for (int i=0; i < 5; i++) {
    //             data += String.valueOf(i);
    //             emitter.send(
    //                 eventBuilder
    //                 .data(data)
    //                 .name("dataSet-created")
    //                 .id(String.valueOf(data.hashCode()))
    //             );
    //             Thread.sleep(2000);
    //         }
            
    //     } catch (IOException | InterruptedException e) {
    //         e.printStackTrace();
    //     }

    //     // Pass the emitter to another component...
    //     return emitter;
    // }
package nbu.market.controllers;

import java.io.IOException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter.SseEventBuilder;

import nbu.market.models.Product;

@CrossOrigin(origins = "http://127.0.0.1:5500")
@RestController
@RequestMapping("/api")
public class Market {
    
    @RequestMapping(value="/resource-uri", method=RequestMethod.GET)
    public SseEmitter handle() 
    {
        SseEmitter emitter = new SseEmitter();
        
        SseEventBuilder eventBuilder = SseEmitter.event();
 
        String data = "goshe";

        try {
            for (int i=0; i < 5; i++) {
                data += String.valueOf(i);
                emitter.send(
                    eventBuilder
                    .data(data)
                    .name("dataSet-created")
                    .id(String.valueOf(data.hashCode()))
                );
                Thread.sleep(2000);
            }
            
        } catch (IOException | InterruptedException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        // Pass the emitter to another component...
        return emitter;
    }

    @GetMapping("/emit-data-sets")
    public SseEmitter fetchData2() 
    {
        SseEmitter emitter = new SseEmitter();

        ExecutorService executor = Executors.newSingleThreadExecutor();

        executor.execute(() -> 
        {
            try {
                for (int i=0; i < 5; i++) {
                        randomDelay();
                        emitter.send("Gosheeetuka");
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
                Thread.sleep(1000);
        } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
        }
    }

    @GetMapping("/products")
    public Product[] getAllProducts() { // @RequestParam String text
        return new Product[] {
            new Product("123", "apple", 1.0, "nutritious", 2),
            new Product("321", "meat", 10.0, "nutritious", 5),
            new Product("213", "shampoo", 5.0, "non-nutritious", 2)
        };
    }
}

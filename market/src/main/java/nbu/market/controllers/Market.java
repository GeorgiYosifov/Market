package nbu.market.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class Market {

    @GetMapping("/products")
    public String[] getAllProducts() { // @RequestParam String text
        return new String[] {
            "First Item",
            "Second Item"
        };
    }
}

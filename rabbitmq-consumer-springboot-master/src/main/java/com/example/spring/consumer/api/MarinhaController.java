package com.example.spring.consumer.api;

import com.example.spring.consumer.dto.AeronaveDto;
import com.example.spring.consumer.modelo.Aeronave;
import com.example.spring.consumer.repository.AeronaveRepository;
import com.example.spring.consumer.viewmodel.AeronaveViewModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:8082/")
@RequestMapping("/aeronaves")
public class MarinhaController {

    @Autowired
    private AeronaveRepository aeronaveRepository;

    @GetMapping
    public List<AeronaveDto> lista() {
            List<Aeronave> aeronaves = aeronaveRepository.findAll();
            return AeronaveDto.converter(aeronaves);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AeronaveDto> detalhar(@PathVariable Long id) {
        Optional<Aeronave> aeronave = aeronaveRepository.findById(id);
        return aeronave.map(value -> ResponseEntity.ok(new AeronaveDto(value))).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    @Transactional
    public ResponseEntity<AeronaveDto> cadastrar(@RequestBody AeronaveViewModel aeronaveViewModel, UriComponentsBuilder uriBuilder) {
        Aeronave aeronave = aeronaveViewModel.converter();
        aeronaveRepository.save(aeronave);

        URI uri = uriBuilder.path("aeronaves/{id}").buildAndExpand(aeronave.getId()).toUri();
        return ResponseEntity.created(uri).body(new AeronaveDto(aeronave));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity remover(@PathVariable Long id) {
        aeronaveRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<AeronaveDto> atualizar(@PathVariable Long id, @RequestBody AeronaveViewModel form) {

        Aeronave aeronave = form.atualizar(id, aeronaveRepository);
        return ResponseEntity.ok(new AeronaveDto(aeronave));
    }
}

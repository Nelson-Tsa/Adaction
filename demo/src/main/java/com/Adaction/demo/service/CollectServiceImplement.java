package com.Adaction.demo.service;

import com.Adaction.demo.modele.Collect;
import com.Adaction.demo.repository.CollectRepository;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import java.util.List;

@Service
@AllArgsConstructor
public class CollectServiceImplement implements CollectService {

    private final CollectRepository collectRepository;

    @Override
    public Collect createCollect(Collect collect) {
        return collectRepository.save(collect);
    }

     @Override
    public List<Collect> getAllCollects() {
        return collectRepository.findAll();
    }

     @Override
    public Collect updateCollect(Long id, Collect collect) {
       return collectRepository.findById(id)
            .map(c -> {
                c.setCityId(collect.getCityId());
                c.setVolunteerId(collect.getVolunteerId());
                c.setCreatedAt(collect.getCreatedAt());
                c.setUpdatedAt(collect.getUpdatedAt());
                return collectRepository.save(c);
            }).orElseThrow(() -> new RuntimeException("Collect not found with id " + id));
    }

     @Override
    public String deleteCollect(Long id) {
        collectRepository.deleteById(id);
    return "Association with id " + id + " has been deleted successfully.";
}

    @Override
    public Collect getCollectById(Long id) {
        return collectRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Collect not found with id " + id));
    }
}
package com.Adaction.demo.service;

import com.Adaction.demo.modele.WasteCollected;
import com.Adaction.demo.repository.WasteCollectedRepository;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import java.util.List;

@Service
@AllArgsConstructor
public class WasteCollectedServiceImplement implements WasteCollectedService {

    private final WasteCollectedRepository wasteCollectedRepository;

     @Override
    public WasteCollected createWasteCollected(WasteCollected wasteCollected) {
        return wasteCollectedRepository.save(wasteCollected);
    } 
    @Override
    public List<WasteCollected> getAllWasteCollecteds() {
        return wasteCollectedRepository.findAll();
    }
     
    @Override
    public WasteCollected updateWasteCollected(Long id, WasteCollected wasteCollected) {
        return wasteCollectedRepository.findById(id)
            .map(w -> {
                w.setCollectId(wasteCollected.getCollectId());
                w.setWasteTypeId(wasteCollected.getWasteTypeId());
                w.setQuantity(wasteCollected.getQuantity());
                return wasteCollectedRepository.save(w);
            }).orElseThrow(() -> new RuntimeException("Waste collected not found with id " + id));
    }
    @Override
    public String deleteWasteCollected(Long id) {
        wasteCollectedRepository.deleteById(id);
        return "Waste collected with id " + id + " has been deleted successfully.";
    }
    @Override
    public WasteCollected getWasteCollectedById(Long id) {
        return wasteCollectedRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Waste collected not found with id " + id));
    }
}

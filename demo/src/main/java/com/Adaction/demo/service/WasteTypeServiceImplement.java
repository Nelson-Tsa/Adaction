package com.Adaction.demo.service;


import com.Adaction.demo.modele.WasteType;
import com.Adaction.demo.repository.WasteTypeRepository;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import java.util.List;

@Service
@AllArgsConstructor
public class WasteTypeServiceImplement implements WasteTypeService {

    private final WasteTypeRepository wasteTypeRepository;

    @Override
    public List<WasteType> getAllWasteTypes() {
        return wasteTypeRepository.findAll();
    }
    @Override
    public WasteType createWasteType(WasteType wasteType) {
        return wasteTypeRepository.save(wasteType);
    }
    @Override
    public WasteType updateWasteType(Long id, WasteType wasteType) {
        return wasteTypeRepository.findById(id)
            .map(w -> {
               w.setValue(wasteType.getValue());
               w.setLabel(wasteType.getLabel());
               w.setClassName(wasteType.getClassName());
                w.setPoints(wasteType.getPoints());
                return wasteTypeRepository.save(w);
            }).orElseThrow(() -> new RuntimeException("Waste type not found with id " + id));
    }
    @Override
    public String deleteWasteType(Long id) {
        wasteTypeRepository.deleteById(id);
        return "Waste type with id " + id + " has been deleted successfully.";
    }
    @Override
    public WasteType getWasteTypeById(Long id) {
        return wasteTypeRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Waste type not found with id " + id));
    }

}

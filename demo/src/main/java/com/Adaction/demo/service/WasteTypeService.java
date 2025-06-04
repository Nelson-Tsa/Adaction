package com.Adaction.demo.service;

import com.Adaction.demo.modele.WasteType;
import java.util.List;
public interface WasteTypeService {

    WasteType createWasteType(WasteType wasteType);

    List<WasteType> getAllWasteTypes();

    WasteType getWasteTypeById(Long id);

    WasteType updateWasteType(Long id, WasteType wasteType);

    String deleteWasteType(Long id);

}

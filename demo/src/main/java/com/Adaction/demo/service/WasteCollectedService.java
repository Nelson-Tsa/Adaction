package com.Adaction.demo.service;

import com.Adaction.demo.modele.WasteCollected;
import java.util.List;
public interface WasteCollectedService {
   
    WasteCollected createWasteCollected(WasteCollected wasteCollected);

    List<WasteCollected> getAllWasteCollecteds();
    WasteCollected getWasteCollectedById(Long id);

    WasteCollected updateWasteCollected(Long id, WasteCollected wasteCollected);

    String deleteWasteCollected(Long id);
}

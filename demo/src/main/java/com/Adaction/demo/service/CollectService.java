package com.Adaction.demo.service;

import java.util.List;
import com.Adaction.demo.modele.Collect;

public interface CollectService {

    Collect createCollect(Collect collect);

    List<Collect> getAllCollects();
    
    Collect getCollectById(Long id);

    Collect updateCollect(Long id, Collect collect);

    String deleteCollect(Long id);

}

package com.airline.flightservice.repository;

import com.airline.flightservice.entity.Airport;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AirportRepository extends JpaRepository<Airport, String> {
} 
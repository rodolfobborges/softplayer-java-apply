package br.com.softplan.peopleregistrationservice.repository;

import br.com.softplan.peopleregistrationservice.domain.People;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the People entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PeopleRepository extends JpaRepository<People, Long> {

}

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, TextFormat, openFile, byteSize } from 'react-jhipster';
import { APP_DATE_FORMAT } from 'app/config/constants';
import PersonCard from './person-card';

const PersonTable = ({ personList, loading, sort, getSortIconByFieldName }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  const filteredPersonList = personList.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="table-responsive">
      <div className="mb-3">
        <Input type="text" placeholder="Search by name" value={searchTerm} onChange={handleSearchChange} />
      </div>
      {filteredPersonList && filteredPersonList.length > 0
        ? filteredPersonList.map((person, i) => (
            <PersonCard key={`entity-${i}`} person={person} getSortIconByFieldName={getSortIconByFieldName} />
          ))
        : !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="seaportApp.person.home.notFound">No People found</Translate>
            </div>
          )}
    </div>
  );
};

export default PersonTable;

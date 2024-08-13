import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, TextFormat, openFile, byteSize } from 'react-jhipster';
import { APP_DATE_FORMAT } from 'app/config/constants';
import './PersonCard.css';
import { updateEntity } from 'app/entities/person/person.reducer';
import { useAppDispatch } from 'app/config/store';
const PersonCard = ({ person, getSortIconByFieldName }) => {
  const dispatch = useAppDispatch();
  const handleToggleAuthor = () => {
    const updatedPerson = {
      ...person,
      isAuthor: !person.isAuthor,
    };
    dispatch(updateEntity(updatedPerson));
  };
  return (
    <div className="PersonCard">
      <div className="PersonCard-avatar">
        {person.avatar ? (
          <div>
            {person.avatarContentType ? (
              <img
                src={`data:${person.avatarContentType};base64,${person.avatar}`}
              />
            ) : null}
          </div>
        ) : null}
      </div>
      <div className="PersonCard-info">
        <div>{person.name}</div>
        <div>{person.phone}</div>
        <div>{person.country}</div>
        <div>{person.address}</div>
        <div>
          {person.department ? (
            <Link to={`/department/${person.department.id}`}>
              {person.department.name}
            </Link>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className="PersonCard-author">
        <div>{person.isAuthor ? 'true' : 'false'}</div>
        <div>
          {person.createdAt ? (
            <TextFormat
              type="date"
              value={person.createdAt}
              format={APP_DATE_FORMAT}
            />
          ) : null}
        </div>
      </div>
      <div className="text-end">
        <div className="btn-group flex-btn-group-container">
          {person.isAuthor ? (
            <Button color="danger" size="sm" onClick={handleToggleAuthor}>
              <FontAwesomeIcon icon="ban" />{' '}
              <span className="d-none d-md-inline">Disable Author</span>
            </Button>
          ) : (
            <Button color="success" size="sm" onClick={handleToggleAuthor}>
              <FontAwesomeIcon icon="check" />{' '}
              <span className="d-none d-md-inline">Approve Author</span>
            </Button>
          )}
          <Button
            tag={Link}
            to={`/person/${person.id}/edit`}
            color="primary"
            size="sm"
            data-cy="entityEditButton"
          >
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PersonCard;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Translate } from 'react-jhipster';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

const CategoryCard = ({ category }) => {
  return (
    <tr data-cy="entityTable">
      <td>
        <Button
          tag={Link}
          to={`/category/${category.id}`}
          color="link"
          size="sm"
        >
          {category.id}
        </Button>
      </td>
      <td>{category.name}</td>
      <td className="text-end">
        <div className="btn-group flex-btn-group-container">
          <Button
            tag={Link}
            to={`/category/${category.id}`}
            color="info"
            size="sm"
            data-cy="entityDetailsButton"
          >
            <FontAwesomeIcon icon="eye" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.view">View</Translate>
            </span>
          </Button>
          <Button
            tag={Link}
            to={`/category/${category.id}/edit`}
            color="primary"
            size="sm"
            data-cy="entityEditButton"
          >
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
          <Button
            onClick={() =>
              (window.location.href = `/category/${category.id}/delete`)
            }
            color="danger"
            size="sm"
            data-cy="entityDeleteButton"
          >
            <FontAwesomeIcon icon="trash" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.delete">Delete</Translate>
            </span>
          </Button>
        </div>
      </td>
    </tr>
  );
};
export default CategoryCard;

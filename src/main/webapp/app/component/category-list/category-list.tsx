import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Translate } from 'react-jhipster';
import { Link } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import CategoryCard from '../category-card/category-card';

const CategoryList = ({ loading, categoryList, sort, getSortIconByFieldName }) => {
  return (
    <div>
      {categoryList && categoryList.length > 0 ? (
        <Table responsive>
          <thead>
            <tr>
              <th className="hand" onClick={sort('id')}>
                <Translate contentKey="seaportApp.category.id">ID</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
              </th>
              <th className="hand" onClick={sort('name')}>
                <Translate contentKey="seaportApp.category.name">Name</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('name')} />
              </th>
              <th />
            </tr>
          </thead>
          <tbody>
            {categoryList.map((category, i) => (
              <CategoryCard key={`entity-${i}`} category={category} />
              //   <tr key={`entity-${i}`} data-cy="entityTable">
              //     <td>
              //       <Button tag={Link} to={`/category/${category.id}`} color="link" size="sm">
              //         {category.id}
              //       </Button>
              //     </td>
              //     <td>{category.name}</td>
              //     <td className="text-end">
              //       <div className="btn-group flex-btn-group-container">
              //         <Button tag={Link} to={`/category/${category.id}`} color="info" size="sm" data-cy="entityDetailsButton">
              //           <FontAwesomeIcon icon="eye" />{' '}
              //           <span className="d-none d-md-inline">
              //             <Translate contentKey="entity.action.view">View</Translate>
              //           </span>
              //         </Button>
              //         <Button tag={Link} to={`/category/${category.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
              //           <FontAwesomeIcon icon="pencil-alt" />{' '}
              //           <span className="d-none d-md-inline">
              //             <Translate contentKey="entity.action.edit">Edit</Translate>
              //           </span>
              //         </Button>
              //         <Button
              //           onClick={() => (window.location.href = `/category/${category.id}/delete`)}
              //           color="danger"
              //           size="sm"
              //           data-cy="entityDeleteButton"
              //         >
              //           <FontAwesomeIcon icon="trash" />{' '}
              //           <span className="d-none d-md-inline">
              //             <Translate contentKey="entity.action.delete">Delete</Translate>
              //           </span>
              //         </Button>
              //       </div>
              //     </td>
              //   </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        !loading && (
          <div className="alert alert-warning">
            <Translate contentKey="seaportApp.category.home.notFound">No Categories found</Translate>
          </div>
        )
      )}
    </div>
  );
};
export default CategoryList;

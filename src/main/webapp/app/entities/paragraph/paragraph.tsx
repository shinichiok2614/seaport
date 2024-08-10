import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import {
  openFile,
  byteSize,
  Translate,
  TextFormat,
  getSortState,
} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSort,
  faSortUp,
  faSortDown,
} from '@fortawesome/free-solid-svg-icons';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, SORT } from 'app/shared/util/pagination.constants';
import { overrideSortStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './paragraph.reducer';

export const Paragraph = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [sortState, setSortState] = useState(
    overrideSortStateWithQueryParams(
      getSortState(pageLocation, 'id'),
      pageLocation.search,
    ),
  );

  const paragraphList = useAppSelector(state => state.paragraph.entities);
  const loading = useAppSelector(state => state.paragraph.loading);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        sort: `${sortState.sort},${sortState.order}`,
      }),
    );
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?sort=${sortState.sort},${sortState.order}`;
    if (pageLocation.search !== endURL) {
      navigate(`${pageLocation.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [sortState.order, sortState.sort]);

  const sort = p => () => {
    setSortState({
      ...sortState,
      order: sortState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handleSyncList = () => {
    sortEntities();
  };

  const getSortIconByFieldName = (fieldName: string) => {
    const sortFieldName = sortState.sort;
    const order = sortState.order;
    if (sortFieldName !== fieldName) {
      return faSort;
    } else {
      return order === ASC ? faSortUp : faSortDown;
    }
  };

  return (
    <div>
      <h2 id="paragraph-heading" data-cy="ParagraphHeading">
        <Translate contentKey="seaportApp.paragraph.home.title">
          Paragraphs
        </Translate>
        <div className="d-flex justify-content-end">
          <Button
            className="me-2"
            color="info"
            onClick={handleSyncList}
            disabled={loading}
          >
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="seaportApp.paragraph.home.refreshListLabel">
              Refresh List
            </Translate>
          </Button>
          <Link
            to="/paragraph/new"
            className="btn btn-primary jh-create-entity"
            id="jh-create-entity"
            data-cy="entityCreateButton"
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="seaportApp.paragraph.home.createLabel">
              Create new Paragraph
            </Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {paragraphList && paragraphList.length > 0 ? (
          <Table responsive>
            <tbody>
              {paragraphList.map((paragraph, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button
                      tag={Link}
                      to={`/paragraph/${paragraph.id}`}
                      color="link"
                      size="sm"
                    >
                      {paragraph.id}
                    </Button>
                  </td>
                  <td>
                    {paragraph.image ? (
                      <div>
                        {paragraph.imageContentType ? (
                          <a
                            onClick={openFile(
                              paragraph.imageContentType,
                              paragraph.image,
                            )}
                          >
                            <img
                              src={`data:${paragraph.imageContentType};base64,${paragraph.image}`}
                              style={{ maxHeight: '30px' }}
                            />
                            &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {paragraph.imageContentType},{' '}
                          {byteSize(paragraph.image)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>{paragraph.caption}</td>
                  <td>{paragraph.content}</td>
                  <td>{paragraph.contentType}</td>
                  <td>
                    {paragraph.createdAt ? (
                      <TextFormat
                        type="date"
                        value={paragraph.createdAt}
                        format={APP_DATE_FORMAT}
                      />
                    ) : null}
                  </td>
                  <td>
                    {paragraph.updatedAt ? (
                      <TextFormat
                        type="date"
                        value={paragraph.updatedAt}
                        format={APP_DATE_FORMAT}
                      />
                    ) : null}
                  </td>
                  <td>
                    {paragraph.paragraph ? (
                      <Link to={`/post/${paragraph.paragraph.id}`}>
                        {paragraph.paragraph.name}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/paragraph/${paragraph.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">
                            View
                          </Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/paragraph/${paragraph.id}/edit`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">
                            Edit
                          </Translate>
                        </span>
                      </Button>
                      <Button
                        onClick={() =>
                          (window.location.href = `/paragraph/${paragraph.id}/delete`)
                        }
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">
                            Delete
                          </Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="seaportApp.paragraph.home.notFound">
                No Paragraphs found
              </Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Paragraph;

// src/main/webapp/app/entities/message/message-item.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { openFile, byteSize, Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { APP_DATE_FORMAT } from 'app/config/constants';

const MessageItem = ({ message, getSortIconByFieldName, sort }) => {
  return (
    <tr key={`entity-${message.id}`} data-cy="entityTable">
      <td>
        <Button tag={Link} to={`/message/${message.id}`} color="link" size="sm">
          {message.id}
        </Button>
      </td>
      <td>{message.content}</td>
      <td>
        {message.image ? (
          <div>
            {message.imageContentType ? (
              <a onClick={openFile(message.imageContentType, message.image)}>
                <img src={`data:${message.imageContentType};base64,${message.image}`} style={{ maxHeight: '30px' }} />
                &nbsp;
              </a>
            ) : null}
            <span>
              {message.imageContentType}, {byteSize(message.image)}
            </span>
          </div>
        ) : null}
      </td>
      <td>{message.createdAt ? <TextFormat type="date" value={message.createdAt} format={APP_DATE_FORMAT} /> : null}</td>
      <td>{message.sender ? message.sender.login : ''}</td>
      <td>{message.receiver ? message.receiver.login : ''}</td>
      <td className="text-end">
        <div className="btn-group flex-btn-group-container">
          <Button tag={Link} to={`/message/${message.id}`} color="info" size="sm" data-cy="entityDetailsButton">
            <FontAwesomeIcon icon="eye" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.view">View</Translate>
            </span>
          </Button>
          <Button tag={Link} to={`/message/${message.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
          <Button
            onClick={() => (window.location.href = `/message/${message.id}/delete`)}
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

export default MessageItem;

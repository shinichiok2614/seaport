// src/main/webapp/app/entities/message/message-list.tsx

import React from 'react';
import { Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MessageItem from '../message-item/message-item';

const MessageList = ({ messageList, loading, sort, getSortIconByFieldName }) => {
  return (
    <div className="table-responsive">
      {messageList && messageList.length > 0 ? (
        <Table responsive>
          <thead>
            <tr>
              <th className="hand" onClick={sort('id')}>
                <Translate contentKey="seaportApp.message.id">ID</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
              </th>
              <th className="hand" onClick={sort('content')}>
                <Translate contentKey="seaportApp.message.content">Content</Translate>{' '}
                <FontAwesomeIcon icon={getSortIconByFieldName('content')} />
              </th>
              <th className="hand" onClick={sort('image')}>
                <Translate contentKey="seaportApp.message.image">Image</Translate>{' '}
                <FontAwesomeIcon icon={getSortIconByFieldName('image')} />
              </th>
              <th className="hand" onClick={sort('createdAt')}>
                <Translate contentKey="seaportApp.message.createdAt">Created At</Translate>{' '}
                <FontAwesomeIcon icon={getSortIconByFieldName('createdAt')} />
              </th>
              <th>
                <Translate contentKey="seaportApp.message.sender">Sender</Translate> <FontAwesomeIcon icon="sort" />
              </th>
              <th>
                <Translate contentKey="seaportApp.message.receiver">Receiver</Translate> <FontAwesomeIcon icon="sort" />
              </th>
              <th />
            </tr>
          </thead>
          <tbody>
            {messageList.map((message, i) => (
              <MessageItem key={`entity-${i}`} message={message} getSortIconByFieldName={getSortIconByFieldName} sort={sort} />
            ))}
          </tbody>
        </Table>
      ) : (
        !loading && (
          <div className="alert alert-warning">
            <Translate contentKey="seaportApp.message.home.notFound">No Messages found</Translate>
          </div>
        )
      )}
    </div>
  );
};

export default MessageList;

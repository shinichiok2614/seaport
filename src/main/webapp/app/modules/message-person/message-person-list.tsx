import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Translate } from 'react-jhipster';

const MessagePersonList = ({ messageList, loading }) => (
  <ListGroup>
    {messageList.map((message, i) => (
      <ListGroupItem key={`entity-${i}`} className="message-item">
        <div className="d-flex justify-content-between">
          <div>
            <b>{message.senderName}</b>
            <p>{message.content}</p>
          </div>
          <small className="text-muted">
            {message.createdAt ? (
              <Translate contentKey="seaportApp.message.createdAt" />
            ) : (
              ''
            )}
          </small>
        </div>
      </ListGroupItem>
    ))}
  </ListGroup>
);

export default MessagePersonList;

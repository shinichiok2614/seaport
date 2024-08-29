import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, TextFormat, getSortState, ValidatedField, ValidatedForm, ValidatedBlobField, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, SORT } from 'app/shared/util/pagination.constants';
import { overrideSortStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import {
  getEntities as getAllRoomMember,
  deleteEntity as deleteRoomMember,
  getEntitiesByCurrentUser,
  createEntity as createRoomMember,
} from 'app/entities/room-member/room-member.reducer';
import {
  createEntity as createMessage,
  getEntities as getAllMessage,
  getEntitiesByRoom as getAllMessageByRoom,
} from 'app/entities/message/message.reducer';
import { createEntity as createRoom } from 'app/entities/room/room.reducer';
import dayjs from 'dayjs';
import { convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';

import RoomMemberTable from './RoomMemberTable';
import MessageListTable from './message-list-table';
import { unwrapResult } from '@reduxjs/toolkit';
import './MessagePersonRoomMember.css';

export const MessagePersonRoomMember = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [sortState, setSortState] = useState(overrideSortStateWithQueryParams(getSortState(pageLocation, 'id'), pageLocation.search));

  const roomMemberList = useAppSelector(state => state.roomMember.entities);
  const updateSuccess = useAppSelector(state => state.roomMember.updateSuccess);
  const loading = useAppSelector(state => state.roomMember.loading);
  const currentUser = useAppSelector(state => state.authentication.account);

  useEffect(() => {
    dispatch(getEntitiesByCurrentUser());
  }, [updateSuccess]);
  const getAllEntities = () => {
    dispatch(getEntitiesByCurrentUser());
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

  // const handleSyncList = () => {
  //   sortEntities();
  // };

  const getSortIconByFieldName = (fieldName: string) => {
    const sortFieldName = sortState.sort;
    const order = sortState.order;
    if (sortFieldName !== fieldName) {
      return faSort;
    } else {
      return order === ASC ? faSortUp : faSortDown;
    }
  };

  ////////////////////////////

  const messageList = useAppSelector(state => state.message.entities);
  const loadingmessageList = useAppSelector(state => state.message.loading);
  const messageupdateSuccess = useAppSelector(state => state.message.updateSuccess);

  ///////////////////////////

  const [selectedRoomId, setSelectedRoomId] = useState<string>('');
  const [selectedRoomMemberId, setSelectedRoomMemberId] = useState<string>('');
  const [selectedRoomMember, setSelectedRoomMember] = useState(null);
  useEffect(() => {
    socketRef.current = new WebSocket('ws://localhost:8000');
    //lich su chat
    // socketRef.current.onmessage = event => {
    //   const { room: receivedRoom, text, username } = JSON.parse(event.data);
    //   if (receivedRoom === room) {
    //     setMessages(prevMessages => [...prevMessages, { text, username }]);
    //   }
    // };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
    // }, [selectedRoomId, selectedRoomMemberId]);
  }, []);
  // useEffect(() => {
  //   // Lắng nghe tín hiệu từ server chỉ một lần khi component được mount
  //   socketRef.current.onmessage = event => {
  //     const { type, room: receivedRoom } = JSON.parse(event.data);

  //     if (type === 'newMessage' && receivedRoom === selectedRoomId) {
  //       // Có tin nhắn mới, tải lại danh sách tin nhắn
  //       dispatch(getAllMessageByRoom(receivedRoom));
  //     }
  //   };
  // }, [dispatch, selectedRoomId]);
  useEffect(() => {
    if (selectedRoomId) {
      dispatch(getAllMessageByRoom(selectedRoomId));
    }
    socketRef.current.onmessage = event => {
      const { type, room: receivedRoom, text, username, id } = JSON.parse(event.data);
      if (type === 'newMessage' && selectedRoomId) {
        dispatch(getAllMessageByRoom(selectedRoomId));
      }

      if (receivedRoom === room) {
        setMessages(prevMessages => {
          // Loại bỏ các tin nhắn đã lưu thành công
          const filteredMessages = prevMessages.filter(message => message.id !== id);
          return [...filteredMessages, { text, username, id }];
        });
      }
    };
  }, [selectedRoomId, selectedRoomMemberId, messageupdateSuccess]);

  useEffect(() => {
    if (socketRef.current && joined) {
      const messageId = dayjs().valueOf().toString(); // Tạo ID duy nhất cho tin nhắn này
      socketRef.current.send(JSON.stringify({ type: 'save', room, text: inputValue, username, id: messageId }));
    }
  }, [messageupdateSuccess]);

  const handleRoomMemberClick = (roomMember, roommemberId, roomId) => {
    setSelectedRoomMember(roomMember);
    setSelectedRoomMemberId(roommemberId);
    setUsername(roommemberId);
    setSelectedRoomId(roomId);
    setRoom(roomId);
  };
  const joinRoom = () => {
    if (socketRef.current && room && username) {
      socketRef.current.send(JSON.stringify({ type: 'join', room, username }));
      setJoined(true);
    }
  };
  const [sentMessageIds, setSentMessageIds] = useState<Set<string>>(new Set());
  const sendMessage = () => {
    if (socketRef.current && inputValue && joined) {
      const messageId = dayjs().valueOf().toString(); // Tạo ID duy nhất cho tin nhắn này
      socketRef.current.send(JSON.stringify({ type: 'message', room, text: inputValue, username, id: messageId }));

      // Lưu ID của tin nhắn vào danh sách các tin nhắn đã gửi
      setSentMessageIds(prevIds => new Set([...prevIds, messageId]));

      setInputValue('');
      saveEntity();
    }
  };
  const saveEntity = () => {
    const entity = {
      content: inputValue,
      createdAt: dayjs(),
      isActive: true,
      sender: selectedRoomMember,
      message: selectedRoomMember.room,
    };
    dispatch(createMessage(entity));
  };
  ////////////////////////////////////
  // const [messages, setMessages] = useState<{ text: string; username: string }[]>([]);
  const [messages, setMessages] = useState<{ text: string; username: string; id: string }[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [room, setRoom] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [joined, setJoined] = useState<boolean>(false);
  const socketRef = useRef<WebSocket | null>(null);
  ////////////////////////////////////
  const saveRoomPrivate = async () => {
    const entity = {
      name: `RoomPrivate-${dayjs()}`,
      isPrivate: true,
      createdAt: dayjs(),
    };
    const actionResult = await dispatch(createRoom(entity));
    const result = unwrapResult(actionResult);

    const RoomMemberEntity = {
      room: result.data,
      roommember: currentUser,
      name: currentUser.person.name,
      joinedAt: dayjs(),
    };

    dispatch(createRoomMember(RoomMemberEntity));
  };

  return (
    <div className="MessagePersonRoomMember">
      <div className="MessagePersonRoomMember1">
        <RoomMemberTable
          roomMemberList={roomMemberList}
          loading={loading}
          sort={sort}
          getSortIconByFieldName={getSortIconByFieldName}
          handleRoomMemberClick={handleRoomMemberClick}
          joinRoom={joinRoom}
          saveRoomPrivate={saveRoomPrivate}
        />
        <div className="MessagePersonRoomMember1-messagelist-body">
          <MessageListTable
            messageList={messageList}
            sort={sort}
            getSortIconByFieldName={getSortIconByFieldName}
            selectedRoomMemberId={selectedRoomMemberId}
          />
          <div>
            <div>
              {messages.map((message, index) => (
                <div key={index}>
                  <strong>{message.username}:</strong> {message.text}
                </div>
              ))}
            </div>
            <div className="MessagePersonRoomMember-message"></div>
            <input
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyPress={e => {
                if (e.key === 'Enter') sendMessage();
              }}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
          <Button className="me-2" color="info" disabled={loadingmessageList}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="seaportApp.message.home.refreshListLabel">Refresh List</Translate>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MessagePersonRoomMember;

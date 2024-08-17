import React, { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
// import MyCustomTool from './MyCustomTool';

const EditorComponent = ({
  data,
  onChange,
  readOnly = false,
  holder = 'editorjs',
}) => {
  const editorInstance = useRef(null);

  useEffect(() => {
    if (!editorInstance.current) {
      editorInstance.current = new EditorJS({
        holder: holder,
        tools: {
          header: Header,
          list: List,
          // myCustomTool: MyCustomTool,
        },
        data,
        readOnly,
        onReady: () => {
          console.log('Editor.js is ready to work!');
        },
        onChange: async () => {
          const content = await editorInstance.current.save();
          onChange(content);
        },
      });
    } else {
      editorInstance.current.render(data);
    }

    return () => {
      if (editorInstance.current && editorInstance.current.isReady) {
        editorInstance.current.isReady
          .then(() => {
            editorInstance.current.destroy();
            editorInstance.current = null;
          })
          .catch(error =>
            console.error('Error destroying Editor.js instance:', error),
          );
      }
    };
  }, [holder]);

  return <div id={holder} />;
};

export default EditorComponent;

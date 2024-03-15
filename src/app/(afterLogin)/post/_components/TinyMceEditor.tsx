'use client';
import React, { use, useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import useMentoNewPost from '../../_store/mentoNewPost';

const TinyMceEditor = () => {
    const { content } = useMentoNewPost();
    const [text, setText] = useState('');

    const tinymcePlugins = ['link', 'lists', 'autoresize', 'emoticons'];
    const tinymceToolbar =
        'blocks fontfamily |' +
        'bold italic underline strikethrough forecolor backcolor |' +
        'alignleft aligncenter alignright alignjustify |' +
        'emoticons |' +
        'bullist numlist blockquote link';
    const onEditorInputChange = (newValue: any, editor: any) => {
        useMentoNewPost.setState({ content: newValue });
        setText(editor.getContent({ format: 'text' }));
    };
    useEffect(() => {
        console.log('text', text, 'value', content);
    }, [text, content]);
    return (
        <div className="my-7">
            <Editor
                apiKey="e95ijqtwyucbdrp95081yvd56acbgshfx4pb3b7hgjs3xt9g"
                onEditorChange={(newValue, editor) => onEditorInputChange(newValue, editor)}
                onInit={(evt, editor) => setText(editor.getContent({ format: 'text' }))}
                init={{
                    plugins: tinymcePlugins,
                    toolbar: tinymceToolbar,
                    min_height: 500,
                    menubar: false,
                    branding: false,
                    statusbar: false,
                    block_formats: '제목1=h2;제목2=h3;제목3=h4;본문=p;',
                    language: 'ko_KR',
                    browser_spellcheck: true,
                    content_style: 'li { margin-bottom: 7px; } ',
                    skin: 'oxide',
                }}
                value={content}
            />
        </div>
    );
};
export default TinyMceEditor;

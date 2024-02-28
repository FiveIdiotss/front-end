'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const TinyMceEditor = () => {
    const [text, setText] = useState('');
    const [value, setValue] =
        useState(`<p><span style="font-family: 'arial black', sans-serif; color: rgb(0, 0, 0); background-color: rgb(251, 238, 184);"><strong>[멘토링 모집 내용 예시]</strong></span></p>
<h2><span style="font-family: 'arial black', sans-serif;"><strong>안녕하세요. 저는 [<span style="color: rgb(22, 145, 121);">홍길동</span>]</strong><span style="color: rgb(0, 0, 0);">&nbsp;</span><strong>입니다!🔥</strong></span></h2>
<p><span style="font-family: 'arial black', sans-serif;"><strong>멘토 자기소개:</strong></span></p>
<p><span style="font-family: 'arial black', sans-serif;"><strong>멘토링 내용:</strong></span></p>
<p><span style="font-family: 'arial black', sans-serif;"><strong>가능한 멘토링 영역:</strong></span></p>
<ul>
<li>1번</li>
<li>2번</li>
<li>3번</li>
</ul>
<p><span style="font-family: 'arial black', sans-serif;"><strong>멘토링 진행방식:</strong></span></p>
<ul>
<li>1번</li>
<li>2번</li>
<li>3번</li>
</ul>
<p><span style="font-family: 'arial black', sans-serif;"><strong>예상 스터디 일정(횟수):&nbsp;</strong></span></p>
<p>&nbsp;</p>`);

    const tinymcePlugins = ['link', 'lists', 'autoresize', 'emoticons'];
    const tinymceToolbar =
        'blocks fontfamily |' +
        'bold italic underline strikethrough forecolor backcolor |' +
        'alignleft aligncenter alignright alignjustify |' +
        'emoticons |' +
        'bullist numlist blockquote link';
    const onEditorInputChange = (newValue: any, editor: any) => {
        setValue(newValue);
        setText(editor.getContent({ format: 'text' }));
    };
    useEffect(() => {
        console.log('text', text, 'value', value);
    }, [text, value]);
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
                value={value}
            />
        </div>
    );
};
export default TinyMceEditor;

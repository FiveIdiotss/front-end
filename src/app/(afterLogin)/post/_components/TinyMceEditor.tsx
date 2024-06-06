'use client';
import React, { use, useCallback, useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import useMentoNewPost from '../../_store/mentoNewPost';
import { debounce } from 'lodash';
import { uploadImage } from '../_lib/uploadFile';
interface BlobInfo {
    id: () => string;
    name: () => string;
    filename: () => string;
    blob: () => Blob;
    base64: () => string;
    blobUri: () => string;
    uri: () => string | undefined;
}
const initialContent = `<p>&nbsp;</p>
<h2><span style="font-family: 'arial black', sans-serif;"><strong>안녕하세요. 저는 [<span style="background-color: rgb(45, 194, 107); color: rgb(241, 196, 15);">정진혁</span>]</strong><span style="color: rgb(0, 0, 0);">&nbsp;</span><strong>입니다!🙌</strong></span></h2>
<p><span style="font-family: 'arial black', sans-serif;">멘토링 내용: 프론트의 모든것</span></p>
<p><span style="font-family: 'arial black', sans-serif;">가능한 멘토링 영역:&nbsp;</span></p>
<ul>
<li>next.js, react.js</li>
<li>auth.js (서버 쿠기, 서버세션과 리프레쉬 토큰 로직을 구현하며 안전하게 관리 해봅시다.)</li>
<li>js</li>
<li>react query</li>
<li>justand</li>
<li>git</li>
<li>tailwind3</li>
</ul>
<p><span style="font-family: 'arial black', sans-serif;">멘토링 진행방식:</span></p>
<ul>
<li>대면</li>
<li>비대면</li>
<li>덕소역</li>
</ul>
<p><span style="font-family: 'arial black', sans-serif;">예상 맨토링 일정(횟수):&nbsp;</span></p>
<p>&nbsp;</p>
<p>&nbsp;</p>`;

const TinyMceEditor = () => {
    const { content, setContent } = useMentoNewPost();
    const [text, setText] = useState('');

    const tinymcePlugins = ['link', 'lists', 'media', 'image', 'autoresize', 'emoticons'];
    const tinymceToolbar =
        'blocks |' +
        'bold italic underline strikethrough forecolor backcolor |' +
        'emoticons link media image |' +
        'alignleft aligncenter alignright alignjustify |' +
        'bullist numlist blockquote ';

    const imageUploadHandler = async (blobInfo: BlobInfo) => {
        const fileName = blobInfo.name();
        const fileType = 'image';

        const mediaForm: any = {
            name: fileName,
            type: fileType,
            feature: 'resource',
            formData: blobInfo.blob(),
            previewImageData: URL.createObjectURL(blobInfo.blob()),
        };
        const path = await uploadImage(mediaForm.formData);

        return path;
    };

    const debouncedHandleSubmit = useCallback(
        debounce((newValue: string, editor: any) => {
            setContent(newValue);
        }, 400), // 디바운스 시간을 300ms로 설정
        [],
    ); //

    useEffect(() => {
        console.log('text', text, 'value', content);
    }, [text, content]);
    return (
        <div className="my-7">
            <Editor
                apiKey="e95ijqtwyucbdrp95081yvd56acbgshfx4pb3b7hgjs3xt9g"
                onEditorChange={(newValue, editor) => debouncedHandleSubmit(newValue, editor)}
                onInit={(evt, editor) => setContent(editor.getContent({ format: 'html' }))}
                init={{
                    plugins: tinymcePlugins,
                    toolbar: tinymceToolbar,
                    min_height: 500,
                    max_width: 738,

                    menubar: false,
                    branding: false,
                    statusbar: false,
                    block_formats: '제목1=h2;제목2=h3;제목3=h4;본문=p;',
                    language: 'ko_KR',
                    browser_spellcheck: true,
                    content_style: 'li { margin-bottom: 7px; } img { max-width: 100%; } a { color: #007bff; } ',
                    skin: 'oxide',
                    placeholder: `내용을 입력해주세요 (이미지나 동영상은 드래그앤드랍 가능)`,
                    automatic_uploads: true,
                    image_description: false,
                    // image_uploadtab: false,
                    file_picker_types: 'image',
                    file_browser_callback_types: 'image',
                    images_upload_handler: imageUploadHandler,
                    resize_img_proportional: true,
                    image_dimensions: false,
                    image_title: false,
                    link_title: false,
                    media_dimensions: false,
                    media_alt_source: false,
                    media_poster: false,
                }}
                initialValue={initialContent}
            />
        </div>
    );
};
export default TinyMceEditor;

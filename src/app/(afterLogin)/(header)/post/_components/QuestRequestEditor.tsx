'use client';

import { Editor } from '@tinymce/tinymce-react';
import { useState } from 'react';
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
type QuestRequestEditorProps = {
    content: string;
    setContent: (content: string) => void;
};

const QuestRequestEditor = ({ content, setContent }: QuestRequestEditorProps) => {
    const [text, setText] = useState('');

    const tinymcePlugins = ['link', 'lists', 'autoresize', 'emoticons', 'media', 'image'];
    const tinymceToolbar =
        'blocks |' +
        ' bold underline strikethrough forecolor backcolor emoticons |' +
        // 'blockquote bullist numlist blockquote link |' + //번호, 글머리 기호 제거중
        ' link media image |' +
        'alignleft aligncenter alignright alignjustify ';

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

    // useEffect(() => {
    //     console.log('text', text, 'value', content);
    // }, [text, content]);

    return (
        <div className="my-7">
            <Editor
                apiKey="e95ijqtwyucbdrp95081yvd56acbgshfx4pb3b7hgjs3xt9g"
                onEditorChange={(newValue, editor) => setContent(newValue)}
                onInit={(evt, editor) => setContent(editor.getContent({ format: 'text' }))}
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
                    autoresize: true,

                    content_style:
                        'li { margin-bottom: 7px; } img { max-width: 100%; height:auto } a { color: #007bff; }  ',
                    skin: 'oxide',
                    placeholder: `내용을 입력해주세요 (이미지나 동영상은 드래그앤드랍 가능)`,
                    automatic_uploads: true,
                    image_description: false,
                    // image_uploadtab: false,
                    file_picker_types: 'image',
                    file_browser_callback_types: 'image',
                    images_upload_handler: imageUploadHandler,
                    image_dimensions: false,
                    image_title: false,
                    link_title: false,
                    media_dimensions: false,
                    media_alt_source: false,
                    media_poster: false,
                    // iframe_template_callback: (data: any) =>
                    //     `<div style="flex; width:100%;  "><div style="position: relative; height: 0px; padding-bottom: 56.25%; text-align: left;"><iframe style="position: absolute; width:100%; height:100%;" title="${data.title}" src="${data.source}" yroscope; picture-in-picture"></iframe></div></div>`,
                    media_max_width: 450,
                }}
            />
        </div>
    );
};
export default QuestRequestEditor;

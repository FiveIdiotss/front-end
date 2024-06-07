import { uploadImage as uploadFile } from '../_lib/uploadFile';
import { useMemo, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ResizeModule from '@botom/quill-resize-module';

type IMediaItem = {
    name: string;
    type: string;
    feature: string;
    formData: File;
    previewImageData: string;
};

// const Font = Quill.import('formats/font');
// Font.whitelist = ['sans-serif', 'arial', 'comic-sans', 'courier-new'];
// Quill.register(Font, true);
// let SizeStyle = Quill.import('attributors/style/size');
// SizeStyle.whitelist = ['10px', '20px', '30px', '40px'];
// Quill.register(SizeStyle, true);
Quill.register('modules/resize', ResizeModule);

type QuestRequestEditorProps = {
    defualtValue?: string;
    setContent: (content: string) => void;
};

const QuillEditor = ({ defualtValue, setContent }: QuestRequestEditorProps) => {
    const quillRef = useRef<ReactQuill | null>(null);

    const imageHandler = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');

        input.click();
        input.onchange = async () => {
            const file: File | null = input.files ? input.files[0] : null;
            if (!file) return;
            const { name } = file;
            const mediaForm: IMediaItem = {
                name,
                type: 'image',
                feature: 'resource',
                formData: file,
                previewImageData: URL.createObjectURL(file),
            };
            const editor = quillRef.current?.getEditor();
            const range = editor?.getSelection() ?? false;
            if (!range) return;
            const path = await uploadFile(mediaForm.formData);
            editor?.insertEmbed(range.index, 'image', path);
            editor?.setSelection({
                index: range.index + 1,
                length: range.length + 1,
            });
        };
    };

    const modules = useMemo(() => {
        return {
            toolbar: {
                container: [
                    // [{ font: ['sans-serif', 'arial', 'comic-sans', 'courier-new'] }],
                    [{ header: [1, 2, 3, false] }],
                    [{ align: [] }],
                    // [{ size: ['10px', '20px', '30px', '40px'] }],
                    ['bold', 'underline', 'strike', 'blockquote', 'link'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    [
                        {
                            color: ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', 'custom-color'],
                        },
                        { background: [] },
                    ],
                    ['image', 'video'],
                    ['clean'],
                    ['#toolbar'],
                ],

                handlers: {
                    image: imageHandler,
                },
            },
            // ImageResize: {
            //     parchment: Quill.import('parchment'),
            //     modules: ['Resize', 'DisplaySize'],
            // },
            resize: {
                locale: {
                    // change them depending on your language
                    altTip: 'Hold down the alt key to zoom',
                    floatLeft: '왼쪽',
                    floatRight: '오른쪽',
                    center: '중앙',
                    restore: '초기화',
                },
            },
        };
    }, []);

    return (
        <ReactQuill
            onChange={setContent}
            className=" mt-7 min-h-96 text-base "
            theme="snow"
            ref={quillRef}
            modules={modules}
            defaultValue={defualtValue}
        />
    );
};

export default QuillEditor;

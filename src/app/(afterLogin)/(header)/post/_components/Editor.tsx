import { uploadImage as uploadFile } from '../_lib/uploadFileService';
import { use, useEffect, useMemo, useRef, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ResizeModule from '@botom/quill-resize-module';
import Image from 'next/image';

type IMediaItem = {
    name: string;
    type: string;
    feature: string;
    formData: File;
    previewImageData: string;
};

Quill.register('modules/resize', ResizeModule);

type QuestRequestEditorProps = {
    defualtValue?: string;
    setContent: (content: string) => void;
    content: string;
    setMainImage: (file: File) => void;
};

const QuillEditor = ({ defualtValue, setContent, content, setMainImage }: QuestRequestEditorProps) => {
    const quillRef = useRef<ReactQuill | null>(null);
    const [images, setImages] = useState<string[]>([]);
    const [imageFocus, setImageFocus] = useState<string>('');
    const formDataList = useRef<
        {
            blob: File;
            url: string;
        }[]
    >([]); // 예시에서 formDataList는 실제로 사용하는 데이터 구조로 변경해야 함

    useEffect(() => {
        const imgTags = content.match(/<img[^>]+src="([^">]+)"/g);
        const imgUrls = imgTags
            ? (imgTags
                  .map((tag) => {
                      const match = tag.match(/src="([^">]+)"/);
                      return match ? match[1] : null;
                  })
                  .filter(Boolean) as string[])
            : [];
        setImages(imgUrls); // 새로운 이미지 저장

        const currentImages = formDataList.current.filter((data) => imgUrls.includes(data.url));
        formDataList.current = currentImages; // 이미지 리스트 업데이트
    }, [content]);

    useEffect(() => {
        if (images.length === 0) setImageFocus('');
        if (images.length === 1) setImageFocus(images[0]);
    }, [images]);

    const handleImageFocusToggle = (url: string) => {
        setImageFocus(url);
    };
    useEffect(() => {
        if (imageFocus === '') return;
        const targetObject = formDataList.current.find((item) => item.url === imageFocus);
        console.log('targetObject', targetObject);
        if (!targetObject) return;
        setMainImage(targetObject?.blob);
    }, [imageFocus]); // 대표 이미지 설정(클릭한 이미지를 대표 이미지로 설정)

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
            formDataList.current.push({ blob: file, url: path });
        }; // 이미지 업로드(formData를 보내면 url을 받아옴)
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
                ],

                handlers: {
                    image: imageHandler,
                },
            },

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
        <>
            {images.length > 0 && (
                <div className="  mt-10 flex w-full  flex-row items-center gap-2 overflow-x-scroll py-2">
                    {
                        // 이미지 미리보기
                        images.map((url, index) => (
                            <div
                                key={index}
                                className={`relative border  ${url === imageFocus ? ' border-neutral-500' : ' border-white'}`}
                            >
                                <button
                                    className={`relative  flex h-[72px] w-[72px] `} // 이미지 미리보기 크기
                                    onClick={() => handleImageFocusToggle(url)}
                                >
                                    <Image
                                        src={url}
                                        alt="미리보기 이미지"
                                        fill
                                        className="object-contain"
                                        sizes="72px"
                                    />
                                </button>
                                <span
                                    className={`bg-yellow absolute top-0 flex  w-full  justify-center bg-yellow-200   p-1 text-xs ${url === imageFocus ? '' : 'hidden'}`}
                                >
                                    대표 이미지
                                </span>
                            </div>
                        ))
                    }
                </div>
            )}
            <ReactQuill
                onChange={setContent}
                className=" mt-2 min-h-96 text-base "
                theme="snow"
                ref={quillRef}
                modules={modules}
                defaultValue={defualtValue}
            />
        </>
    );
};

export default QuillEditor;

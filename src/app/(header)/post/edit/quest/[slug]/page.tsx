import React from 'react';
import QuestForm from '../../../_components/postForm/QuestForm';

function QeustEditPage({ params }: { params: { slug: string } }) {
    const editId = Number(params.slug);
    return <QuestForm editId={editId} />;
}

export default QeustEditPage;

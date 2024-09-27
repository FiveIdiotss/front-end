import React from 'react';
import RequestForm from '../../../_components/postForm/RequestForm';

function RequestEditPage({ params }: { params: { slug: string } }) {
    const editId = Number(params.slug);
    return <RequestForm editId={editId} />;
}

export default RequestEditPage;

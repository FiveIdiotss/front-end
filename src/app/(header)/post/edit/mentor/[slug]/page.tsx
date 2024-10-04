import React from 'react';
import MentorForm from '../../../_components/postForm/MentorForm';

function MentorEditPage({ params }: { params: { slug: string } }) {
    const editId = Number(params.slug);
    return <MentorForm editId={editId} />;
}

export default MentorEditPage;

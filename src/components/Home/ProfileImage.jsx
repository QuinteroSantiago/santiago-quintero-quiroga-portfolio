import React from 'react';

function ProfileImage() {
    return (
        <div style={{
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <img 
                src="/assets/profile-pic.webp" 
                alt="Profile" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
        </div>
    );
}

export default ProfileImage;

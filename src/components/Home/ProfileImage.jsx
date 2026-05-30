function ProfileImage() {
    return (
        <div className="w-full max-w-48">
            <div className="overflow-hidden rounded border border-[var(--border)]">
                <img
                    src="/assets/profile-pic.webp"
                    alt="Portrait of Santiago Quintero"
                    className="aspect-[4/5] w-full object-cover saturate-[0.82]"
                />
            </div>
        </div>
    );
}

export default ProfileImage;

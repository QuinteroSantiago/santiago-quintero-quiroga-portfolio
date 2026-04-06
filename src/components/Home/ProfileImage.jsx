function ProfileImage() {
    return (
        <div className="mx-auto w-full max-w-[18rem]">
            <div className="overflow-hidden rounded-xl border border-[var(--border)]">
                <img
                    src="/assets/profile-pic.webp"
                    alt="Portrait of Santiago Quintero"
                    className="aspect-[4/5] w-full object-cover"
                />
            </div>
        </div>
    );
}

export default ProfileImage;

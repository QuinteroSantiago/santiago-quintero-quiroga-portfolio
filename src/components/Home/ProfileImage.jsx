function ProfileImage() {
    return (
        <div className="relative mx-auto w-full max-w-[19rem]">
            <div className="absolute inset-4 rounded-[2rem] bg-[rgba(165,106,67,0.16)] blur-2xl" />
            <div className="surface-card relative overflow-hidden rounded-[2rem] p-3">
                <img
                    src="/assets/profile-pic.webp"
                    alt="Portrait of Santiago Quintero"
                    className="aspect-[4/5] w-full rounded-[1.5rem] object-cover"
                />
            </div>
        </div>
    );
}

export default ProfileImage;

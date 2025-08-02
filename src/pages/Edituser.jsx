import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { EditService } from "@/services/EditService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function SheetDemo({ open, onOpenChange, user, onUpdate }) {
    const [userName, setUserName] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [previewImage, setPreviewImage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setUserName(user.name || "");
            setPreviewImage(
                user.profileImage
                    ? `http://localhost:5000/uploads/${user.profileImage}`
                    : null
            );
            setProfileImage(user.profileImage);
        }
    }, [user]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
            setProfileImage(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("userName", userName);
        if (profileImage instanceof File) {
            formData.append("profileImage", profileImage);
        }

        try {
            const userId = user?.id || user?._id || localStorage.getItem("id");

            const accessToken = localStorage.getItem("accessToken");

            const result = await EditService(userId, formData, accessToken);

            alert("User updated successfully!");
            onUpdate();
            onOpenChange(false);
        } catch (err) {
            console.error(err);
            alert("Failed to update user.");
        }
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Edit Profile</SheetTitle>
                    <SheetDescription>Update user info and save.</SheetDescription>
                </SheetHeader>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <Input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Enter name"
                        required
                    />

                    <div className="flex items-center gap-4">
                        {previewImage && (
                            <img
                                src={previewImage}
                                alt="Preview"
                                className="w-16 h-16 object-cover rounded border"
                            />
                        )}
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>

                    <SheetFooter>
                        <Button type="submit">Save</Button>
                        <SheetClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </SheetClose>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
}

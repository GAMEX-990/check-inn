// src/components/CreateQRCodeAndUpload.tsx
import { db } from '@/lib/firebase';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import React, { ChangeEvent, useState } from 'react';
import QRCode from 'react-qr-code';

interface CreateQRCodeAndUploadProps {
    classId: string;
}

const CreateQRCodeAndUpload: React.FC<CreateQRCodeAndUploadProps> = ({ classId }) => {
    const [qrCode, setQrCode] = useState<string | null>(null);

    const handleCreateQR = () => {
        const qrLink = `https://your-app-url/class/${classId}`;
        setQrCode(qrLink);
    };

    const handleUploadCSV = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (e) => {
            const text = e.target?.result;
            if (typeof text !== 'string') return;

            const lines = text.split('\n');
            for (const line of lines) {
                const [name, studentId, major] = line.trim().split(',');

                if (name && studentId && major) {
                    await addDoc(collection(db, 'students'), {
                        name,
                        studentId,
                        major,
                        classId,
                        createdAt: Timestamp.now(),
                    });
                }
            }
            alert('อัปโหลดข้อมูลนักเรียนสำเร็จ!');
        };

        reader.readAsText(file);
    };

    return (
        <div className='-mt-30 -ml-37 '>
            <div className='h-0 w-0 mb-12'>
                <button
                    className="border border-purple-600 text-purple-600 px-4 py-1 w-27 rounded-full hover:bg-purple-100 ml-1"
                    onClick={handleCreateQR}
                >
                    Create QR
                </button>
            </div>

            {qrCode && (
                <div className="mt-4 mx-86 h-0 w-0">
                    <QRCode value={qrCode} size={180} />
                </div>
            )}

            <div>
                <div className="h-0 w-0">
                <button
                    onClick={() => document.getElementById('csv-upload')?.click()}
                    className="border border-purple-600 text-purple-600 px-4 py-1 w-30 rounded-full hover:bg-purple-100"
                >
                    Upload CSV
                </button>
                </div>
                <input
                    id="csv-upload"
                    type="file"
                    accept=".csv"
                    onChange={handleUploadCSV}
                    className="hidden"
                />
            </div>
        </div>
    );
};

export default CreateQRCodeAndUpload;

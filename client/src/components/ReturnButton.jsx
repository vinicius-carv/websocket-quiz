import { useNavigate } from 'react-router-dom';
import {useTranslation} from "react-i18next";

const ReturnButton = () => {
    const navigate = useNavigate();
    const { t} = useTranslation();

    const handleReturn = () => {
        navigate(-1);
    };

    return (
        <button onClick={handleReturn} className="btn btn-secondary">
            {t('Back')}
        </button>
    );
};

export default ReturnButton;

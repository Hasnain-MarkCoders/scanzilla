import { useQuery } from '@tanstack/react-query';
import { getPhotosFromUnsplash } from '../../Endpoints/Endpoints';

const useQueryGallery=()=>{
    const { data = [], error, isLoading } = useQuery({ queryKey: ['unsplashPhotos'], queryFn: getPhotosFromUnsplash });
    return {data, error, isLoading}
}

export default useQueryGallery
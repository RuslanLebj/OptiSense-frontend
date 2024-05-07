const StatisticsCard = ({ stat }) => {
    return (
        <div class="max-w-lg w-full rounded-lg shadow-lg p-4 my-4">
            <h3 class="font-semibold text-lg tracking-wide">{stat.screen_detail.name}</h3>
            <p class="text-gray-500 my-1">
                Число показов: {stat.show_count}
            </p>
            <p class="text-gray-500 my-1">
                Общее время просмотра: {stat.total_viewing_time}
            </p>
            <p class="text-gray-500 my-1">
                Максимальное количество зрителей: {stat.max_viewers_count}
            </p>
        </div>
    );
};


export default StatisticsCard;
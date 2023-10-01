import React from 'react';
import styles from "src/pages/DiplomaPage/DiplomaPage.module.css"

interface OutputProps{
    response:string;
    loading:any;
    setGotResponse:any;
    setHaveDescription:any;
    haveSearch: any;
}

export const Output: React.FC<OutputProps> = (props) => {
    const {response, loading, setGotResponse, setHaveDescription, haveSearch } = props;
    const loremResponse = "Описание:\n\nМы ищем опытного веб-разработчика, который сможет создать сайт для нашей компании. Мы хотим, чтобы сайт был современным, привлекательным и функциональным. Ваша задача будет включать в себя разработку и дизайн сайта, а также его оптимизацию для поисковых систем.\n\nОбязанности:\n\n- Разработка и дизайн сайта с использованием современных технологий и языков программирования\n- Создание привлекательного и интуитивно понятного пользовательского интерфейса\n- Оптимизация сайта для улучшения его производительности и видимости в поисковых системах\n- Интеграция сайта с другими системами и платформами, если необходимо\n- Тестирование и отладка сайта для обеспечения его стабильной работы\n\nТребования:\n\n- Опыт работы веб-разработчиком не менее 3 лет\n- Глубокие знания HTML, CSS, JavaScript и других языков программирования\n- Опыт работы с различными CMS, такими как WordPress или Joomla\n- Знание принципов SEO и оптимизации сайтов для поисковых систем\n- Умение работать в команде и соблюдать сроки\n- Креативность и внимание к деталям\n\nЕсли вы готовы принять этот вызов и создать качественный сайт для нашей компании, мы будем рады рассмотреть вашу кандидатуру. Пожалуйста, приложите свое портфолио или примеры работ при отправке заявки."

    return(
        <div>
            {loading ? 
                (<div>Loading...</div>):
                (<div>
                
                <div className={styles.outputContainer} >
                    <p>{response.split('\n').map((paragraph, index) => ( //change loremResponse to response
                    <span key={index}>
                        {paragraph}
                        {index < response.split('\n').length - 1 && <br />}
                    </span>
                        ))}
                    </p>
                </div>
                <div className={styles.buttonContainer}>
                <button 
                    type="button" 
                    onClick={()=>{setGotResponse(false)}} 
                    className={styles.continueButton}
                >Назад
                </button>
                <button
                    type="button"
                    onClick={()=>{setHaveDescription(true)}}
                    className={styles.continueButton}
                >Поиск
                </button>
            </div>
                </div>
                )}
        </div>
    )
};
import './style.css'
import {Text} from "@chakra-ui/react";
import NavButtons from "../navButtons";

const UserAgreement = () => {
    return (
        <div className={"gameContainer"}>
            <div className={"btnGroup1"}>
                <NavButtons/>
            </div>
            <div className={'boxShadow border3Darkslateblue agreementContainer'}>
                <Text textAlign={'center'} margin={'auto'} fontSize={'2em'}>Пользовательское соглашение</Text>
                <Text textAlign={'center'} margin={'auto'} fontSize={'1.5em'}>1. Общие положения</Text>
                <Text fontSize={'1.0em'}>
                    &nbsp;&nbsp;&nbsp;1.1. Настоящее Пользовательское соглашение (далее – "Соглашение") регулирует
                    порядок
                    использования пользователями (далее – "Пользователь") услуг и функционала текстового квеста с
                    использованием искусственного интеллекта (далее – "Сервис"), доступного на сайте (далее – "Сайт").
                    <br/>&nbsp;&nbsp;&nbsp;1.2. Пользователь, используя Сервис, выражает своё полное и безоговорочное
                    согласие с условиями настоящего Соглашения. В случае несогласия с условиями Соглашения, Пользователь
                    обязан незамедлительно прекратить использование Сервиса.
                    <br/>&nbsp;&nbsp;&nbsp;1.3. Сайт и Сервис предназначены для лиц, находящихся на территории
                    Российской
                    Федерации. Использование Сервиса вне территории РФ не допускается.
                </Text>
                <Text textAlign={'center'} margin={'auto'} fontSize={'1.5em'}>2. Права и обязанности сторон</Text>
                <Text textAlign={'center'} margin={'auto'} fontSize={'1.2em'}>2.1. Пользователь обязуется:</Text>
                <Text fontSize={'1.0em'}>
                    &nbsp;&nbsp;&nbsp;2.1.1. Соблюдать все условия настоящего Соглашения, а также требования
                    законодательства РФ.
                    <br/>&nbsp;&nbsp;&nbsp;2.1.2. Не использовать Сервис для распространения незаконного,
                    оскорбительного,
                    дискриминационного или иного запрещённого контента.
                    <br/>&nbsp;&nbsp;&nbsp;2.1.3. Обеспечивать сохранность своих данных, в том числе логинов и паролей,
                    от
                    несанкционированного доступа третьих лиц.
                </Text>
                <Text textAlign={'center'} margin={'auto'} fontSize={'1.2em'}>2.2. Администрация Сайта обязуется:</Text>
                <Text fontSize={'1.0em'}>
                    &nbsp;&nbsp;&nbsp;2.2.1. Предоставлять Пользователю доступ к Сервису в соответствии с условиями
                    Соглашения.
                    <br/>&nbsp;&nbsp;&nbsp;2.2.2. Обеспечивать техническую поддержку работы Сервиса.
                </Text>
                <Text textAlign={'center'} margin={'auto'} fontSize={'1.2em'}>2.3. Администрация Сайта имеет
                    право:</Text>
                <Text fontSize={'1.0em'}>
                    &nbsp;&nbsp;&nbsp;2.3.1. Изменять, дополнять или обновлять условия настоящего Соглашения в
                    одностороннем
                    порядке.
                    Новая версия Соглашения вступает в силу с момента её публикации на Сайте.
                    <br/>&nbsp;&nbsp;&nbsp;2.3.2. Ограничивать или прекращать доступ Пользователя к Сервису
                    без оповещения и оглашения причин.
                </Text>
                <Text textAlign={'center'} margin={'auto'} fontSize={'1.5em'}>3. Ответственность сторон</Text>
                <Text fontSize={'1.0em'}>
                    &nbsp;&nbsp;&nbsp;3.1. Администрация Сайта не несёт ответственности за возможные убытки, возникшие в
                    результате
                    использования или невозможности использования Сервиса Пользователем.
                    <br/>&nbsp;&nbsp;&nbsp;3.2. Пользователь несёт ответственность за все действия, совершённые с
                    использованием его учётной записи.
                    <br/>&nbsp;&nbsp;&nbsp;3.3. В случае нарушения Пользователем условий настоящего Соглашения
                    Администрация
                    Сайта вправе ограничить
                    или прекратить доступ Пользователя к Сервису без предварительного уведомления.
                </Text>
                <Text textAlign={'center'} margin={'auto'} fontSize={'1.5em'}>4. Персональные данные</Text>
                <Text fontSize={'1.0em'}>
                    &nbsp;&nbsp;&nbsp;4.1. В процессе использования Сервиса Пользователь соглашается на обработку своих
                    персональных данных в
                    соответствии с Политикой конфиденциальности Сайта.
                    <br/>&nbsp;&nbsp;&nbsp;4.2. Администрация Сайта обязуется обеспечивать конфиденциальность
                    персональных
                    данных Пользователя и не передавать их третьим лицам без согласия Пользователя, за исключением
                    случаев,
                    предусмотренных законодательством РФ.
                </Text>
                <Text textAlign={'center'} margin={'auto'} fontSize={'1.5em'}>5. Политика допустимого использования
                    ИИ-сервисов ПАО Сбербанк</Text>
                <Text fontSize={'1.0em'}>
                    &nbsp;&nbsp;&nbsp;5.1.Прежде чем пользоваться Сервисом Пользователь должен быть ознакомлен с
                    <a href={'https://developers.sber.ru/docs/ru/policies/gigachat-agreement/permissible-use-ai'}>
                        &nbsp;<u>Политикой допустимого использования ИИ-сервисов ПАО Сбербанк.</u>
                    </a>
                </Text>
                <Text textAlign={'center'} margin={'auto'} fontSize={'1.5em'}>6. Заключительные положения</Text>
                <Text fontSize={'1.0em'}>
                    &nbsp;&nbsp;&nbsp;6.1. Настоящее Соглашение регулируется и толкуется в соответствии с
                    законодательством
                    Российской Федерации.
                    <br/>&nbsp;&nbsp;&nbsp;6.2. Все возможные споры, возникающие из отношений, регулируемых настоящим
                    Соглашением, решаются в
                    соответствии с законодательством Российской Федерации в суде по месту нахождения Администрации
                    Сайта.
                    <br/>&nbsp;&nbsp;&nbsp;6.3. В случае если какое-либо положение настоящего Соглашения будет признано
                    недействительным или не
                    подлежащим исполнению, это не влияет на действительность или исполнимость остальных положений
                    Соглашения.
                    <br/>&nbsp;&nbsp;&nbsp;6.4. Настоящее Соглашение вступает в силу с момента его акцепта Пользователем
                    и
                    действует в течение всего периода использования Пользователем Сервиса.
                </Text>
                <Text textAlign={'center'} margin={'auto'} fontSize={'1.2em'}>Контактная информация</Text>
                <Text textAlign={'center'} margin={'auto'} fontSize={'1.0em'}>
                    &nbsp;&nbsp;&nbsp;Если у вас есть вопросы или предложения, свяжитесь с автором по
                    электронной почте: lokomotiv96000@gmail.com
                </Text>
            </div>
        </div>
    )
}

export default UserAgreement;
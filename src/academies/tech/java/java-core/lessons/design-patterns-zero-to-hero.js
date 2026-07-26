import { defineLearningProblem } from '../../../../../problems/problemAuthoring.js';

const problem = defineLearningProblem({
  id: 'java-core-design-patterns-zero-to-hero',
  category: 'java',
  topicId: 'java-core',
  title: 'Java Design Patterns: From Zero to Hero',
  difficulty: 'Medium',
  prompt: 'A rigorous, production-grade masterclass on object-oriented design patterns in Java. Covers SOLID, KISS, YAGNI, and Law of Demeter principles, then systematically explores the complete Gang-of-Four catalog: Creational (Singleton, Builder, Factory Method, Abstract Factory, Prototype), Structural (Adapter, Decorator, Proxy, Facade, Composite, Bridge, Flyweight), and Behavioral (Strategy, Observer, Command, Template Method, Chain of Responsibility, State, Iterator, Mediator, Memento, Visitor, Interpreter) patterns — plus the everyday enterprise patterns Dependency Injection and Null Object. Every pattern includes when to use, how to use, and when NOT to use, with memorable real-world Java examples, and a dedicated section maps classic patterns to modern Java features (records, sealed classes, pattern matching, lambdas).',
  tags: ['java', 'design-patterns', 'solid', 'kiss', 'architecture', 'gof', 'creational', 'structural', 'behavioral', 'bridge', 'flyweight', 'iterator', 'mediator', 'memento', 'visitor', 'interpreter', 'dependency-injection', 'null-object', 'sealed-classes', 'pattern-matching'],
  rendering: {
    variant: 'deep-dive',
    density: 'detailed',
    accent: 'indigo'
  },
  body: [
    // ============================================================
    // INTRODUCTION
    // ============================================================
    {
      type: 'section',
      title: 'Architectural Introduction: Patterns Are Trade‑Offs, Not Recipes',
      content: 'Design patterns are **proven solutions to recurring problems** in software design. The Gang of Four (GoF) catalog is still the gold standard, but senior engineers understand that every pattern is a **trade‑off** — it solves one problem while introducing others. This masterclass teaches you not only *how* to implement each pattern in modern Java, but also *when* to apply it, *when* to avoid it, and how Java\'s evolving features (records, sealed classes, lambdas) change the way we implement patterns today.'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'The Senior Developer\'s Mindset',
      content: 'Interviews at senior levels don\'t test syntax — they test **judgment**. The weakest answers recite pattern definitions. The strongest answers explain why a pattern is the right (or wrong) choice for a specific context, what it costs, and what alternatives exist.'
    },

    // ============================================================
    // PART 1: FOUNDATIONAL PRINCIPLES
    // ============================================================
    {
      type: 'section',
      title: 'Part 1: Foundational Principles — The Rules That Create Patterns',
      content: 'Design patterns didn\'t appear from nowhere. They emerge from applying foundational principles to common problems. Master these first, and patterns become intuitive rather than memorized.'
    },
    {
      type: 'checklist',
      title: 'The Core Principles — SOLID + Supporting Principles',
      items: [
        '**🔹 SOLID Principles (Core OOP Fundamentals)**',
        '',
        '• **Single Responsibility (SRP)**: A class should have only one reason to change. → Patterns: Factory, Strategy, Observer, Command, State.',
        '• **Open-Closed (OCP)**: Open for extension, closed for modification. → Patterns: Strategy, Decorator, Observer, Template Method.',
        '• **Liskov Substitution (LSP)**: Subtypes must be substitutable for their base types. → Underpins every pattern that uses interfaces and polymorphism.',
        '• **Interface Segregation (ISP)**: Keep interfaces lean and specific. → Patterns: Adapter, Facade, Proxy.',
        '• **Dependency Inversion (DIP)**: Depend on abstractions, not concretions. → Patterns: Factory Method, Abstract Factory, Dependency Injection.',
        '',
        '**🔹 Supporting Principles (Complementary Guidelines)**',
        '',
        '• **KISS (Keep It Simple, Stupid)**: The simplest solution that works is usually the best. → Reminder: never apply a pattern unless the problem genuinely requires it.',
        '• **YAGNI (You Aren\'t Gonna Need It)**: Don\'t add a pattern "just in case" — wait until the need emerges. Premature abstraction is one of the most common causes of over-engineered code.',
        '• **Law of Demeter (Principle of Least Knowledge)**: A module should not know about the internal details of the objects it manipulates. → Patterns: Facade, Mediator.'
      ]
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'Principles Are Guidelines, Not Laws',
      content: 'Blindly applying SOLID, KISS, and YAGNI can lead to over-engineered, fragmented code. The art is knowing when a principle helps and when it hurts — and that judgment comes from understanding the trade-offs, not from memorizing acronyms.'
    },

    // ============================================================
    // PART 2: CREATIONAL PATTERNS
    // ============================================================
    {
      type: 'section',
      title: 'Part 2: Creational Patterns — Managing Object Creation',
      content: 'Creational patterns abstract the instantiation process, making systems independent of how their objects are created, composed, and represented. In modern Java, records and sealed classes have fundamentally changed how we implement some of these patterns.'
    },

    // --- 2.1 Singleton ---
    {
      type: 'section',
      title: '2.1 Singleton — The Most Overused Pattern',
      content: 'Ensures a class has **exactly one instance** and provides a global access point to it. The real challenge is not implementing it — it\'s knowing when *not* to use it.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// The modern, thread-safe Singleton — enum approach (Josh Bloch\'s recommendation)\npublic enum Singleton {\n    INSTANCE;\n    public void doSomething() { /* ... */ }\n}\n\n// Or the holder pattern (lazy, thread-safe, no synchronization overhead)\npublic class Singleton {\n    private Singleton() {}\n    private static class Holder {\n        private static final Singleton INSTANCE = new Singleton();\n    }\n    public static Singleton getInstance() {\n        return Holder.INSTANCE;\n    }\n}'
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'When to Use — and When NOT to Use — Singleton',
      content: '✅ **Use when**: You have a truly global, stateless, system-level component (logging, configuration, thread pool).\n\n❌ **AVOID when**: You\'re using it as a substitute for dependency injection. Singleton introduces global state, makes testing difficult, and creates hidden coupling. In most enterprise applications, you\'re better off using a DI framework (Spring, Guice) to manage single instances. Also avoid when the class has mutable state — that\'s a global variable, not a singleton.\n\n💡 **Remember**: Singleton is not a solution for "I need one of these" — it\'s a solution for "there must be exactly one, and the system must enforce that". If you just need a single instance, dependency injection is cleaner.\n\n🔗 **SOLID**: SRP.'
    },

    // --- 2.2 Builder ---
    {
      type: 'section',
      title: '2.2 Builder — Taming Constructor Explosion',
      content: 'Separates the construction of a complex object from its representation, allowing the same construction process to create different representations. It solves the "telescoping constructor" anti-pattern where classes have dozens of optional parameters.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Modern Builder with records (Java 17+)\npublic record Person(String name, int age, String email, String phone) {\n    public static class Builder {\n        private String name;\n        private int age;\n        private String email;\n        private String phone;\n        public Builder name(String name) { this.name = name; return this; }\n        public Builder age(int age) { this.age = age; return this; }\n        public Builder email(String email) { this.email = email; return this; }\n        public Builder phone(String phone) { this.phone = phone; return this; }\n        public Person build() {\n            return new Person(name, age, email, phone);\n        }\n    }\n    public static Builder builder() { return new Builder(); }\n}\n\n// Usage — fluent and readable\nPerson employee = Person.builder()\n    .name("Alice")\n    .age(30)\n    .email("alice@example.com")\n    .build();'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'When to Use — and When NOT to Use — Builder',
      content: '✅ **Use when**: You have many optional parameters (4+), you need validation during construction, or you\'re building objects with complex configuration (e.g., HTTP requests, database queries).\n\n❌ **AVOID when**: The object has only 1-2 parameters — a simple constructor is cleaner. Also avoid when using records with a small component list — records are immutable data carriers that often make Builder unnecessary.\n\n💡 **Remember**: Builder is about *readability* and *validation*, not just "avoiding long constructors". If the constructor isn\'t hard to read, Builder adds unnecessary complexity.\n\n🔗 **SOLID**: SRP, ISP.'
    },

    // --- 2.3 Factory Method ---
    {
      type: 'section',
      title: '2.3 Factory Method — Deferring Instantiation to Subclasses',
      content: 'Defines an interface for creating an object but lets subclasses decide which class to instantiate. It\'s one of the most widely used patterns in the JDK itself.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Factory Method in the JDK — Stream.of(), List.of(), Set.of()\nList<String> list = List.of("a", "b", "c"); // Returns an immutable List\n\n// Real-world example: Document generation in an enterprise system\npublic abstract class ReportGenerator {\n    public abstract Report createReport();\n    \n    // Template method that uses the factory method\n    public void generateAndExport() {\n        Report report = createReport();\n        report.compile();\n        report.export();\n    }\n}\n\npublic class FinancialReportGenerator extends ReportGenerator {\n    @Override\n    public Report createReport() {\n        return new FinancialReport();\n    }\n}\n\npublic class SalesReportGenerator extends ReportGenerator {\n    @Override\n    public Report createReport() {\n        return new SalesReport();\n    }\n}'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'When to Use — and When NOT to Use — Factory Method',
      content: '✅ **Use when**: You have a class that can\'t anticipate the type of objects it needs to create, or you want to let subclasses decide which object to instantiate. Also when you\'re building frameworks where the framework code calls factory methods to create objects (e.g., JUnit\'s test runners).\n\n❌ **AVOID when**: The object creation is trivial and doesn\'t vary — a simple constructor is clearer. Also avoid when the creation logic doesn\'t vary by subclass — you\'re adding complexity for no benefit.\n\n💡 **Remember**: Factory Method is about *deferring* creation decisions to subclasses. If you don\'t have subclasses, you probably don\'t need it.\n\n🔗 **SOLID**: OCP, DIP.'
    },

    // --- 2.4 Abstract Factory ---
    {
      type: 'section',
      title: '2.4 Abstract Factory — Factories of Factories',
      content: 'Provides an interface for creating **families** of related or dependent objects without specifying their concrete classes. Used when you need to create entire product families that must work together.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Real-world example: UI theme system across platforms\ninterface ThemeFactory {\n    Button createButton();\n    Checkbox createCheckbox();\n    ScrollBar createScrollBar();\n}\n\nclass LightThemeFactory implements ThemeFactory {\n    @Override public Button createButton() { return new LightButton(); }\n    @Override public Checkbox createCheckbox() { return new LightCheckbox(); }\n    @Override public ScrollBar createScrollBar() { return new LightScrollBar(); }\n}\n\nclass DarkThemeFactory implements ThemeFactory {\n    @Override public Button createButton() { return new DarkButton(); }\n    @Override public Checkbox createCheckbox() { return new DarkCheckbox(); }\n    @Override public ScrollBar createScrollBar() { return new DarkScrollBar(); }\n}\n\n// Usage — the whole UI stays consistent\nThemeFactory theme = new DarkThemeFactory();\nButton button = theme.createButton();\nCheckbox checkbox = theme.createCheckbox();\n// All components are dark-themed and consistent'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'When to Use — and When NOT to Use — Abstract Factory',
      content: '✅ **Use when**: You have families of related products that must be used together (UI themes, database drivers, document formats). Also when you want to swap entire families at runtime (e.g., switching from SQL to NoSQL with a single factory change).\n\n❌ **AVOID when**: You only have one product family — a simple Factory Method is simpler. Also avoid when the product families don\'t share a common interface — Abstract Factory only works when all products follow the same contract.\n\n💡 **Remember**: Abstract Factory is about *families* of objects. If you only have one dimension of variation (one type of product), you\'re overcomplicating.\n\n🔗 **SOLID**: OCP, DIP, ISP.'
    },

    // --- 2.5 Prototype ---
    {
      type: 'section',
      title: '2.5 Prototype — Cloning When Construction Is Expensive',
      content: 'Creates new objects by copying an existing object (the prototype) rather than instantiating a new one from scratch. Useful when object creation is expensive or when you need to preserve the state of an object while creating variations.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Real-world example: Generating many variations of a product catalog entry\npublic class ProductCatalogEntry implements Cloneable {\n    private String name;\n    private BigDecimal price;\n    private List<String> features;\n    private Map<String, String> specifications;\n    \n    // Expensive operation: loading data from database, generating images\n    private ProductCatalogEntry loadFromDatabase(String productId) {\n        // ... expensive\n    }\n    \n    @Override\n    public ProductCatalogEntry clone() {\n        try {\n            ProductCatalogEntry cloned = (ProductCatalogEntry) super.clone();\n            cloned.features = new ArrayList<>(this.features);\n            cloned.specifications = new HashMap<>(this.specifications);\n            return cloned;\n        } catch (CloneNotSupportedException e) {\n            throw new RuntimeException(e);\n        }\n    }\n}\n\n// Instead of reloading everything, clone and modify\nProductCatalogEntry baseProduct = loadFromDatabase("SKU-001");\nProductCatalogEntry variant1 = baseProduct.clone();\nvariant1.setName("SKU-001-XL");\nProductCatalogEntry variant2 = baseProduct.clone();\nvariant2.setName("SKU-001-XXL");'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'When to Use — and When NOT to Use — Prototype',
      content: '✅ **Use when**: Object construction is expensive (database queries, image generation, network calls) and you need many variations of the same object. Also when you need to "fork" an object\'s state without affecting the original.\n\n❌ **AVOID when**: Construction is cheap — simple constructors are cleaner. Also avoid when objects have complex circular references — cloning gets messy.\n\n💡 **Remember**: In modern Java, copy constructors and factory methods are often cleaner than `clone()`. Prototype is the least-used creational pattern for a reason — only use it when you genuinely need the performance benefit of cloning over re-construction.\n\n🔗 **SOLID**: OCP.'
    },

    // ============================================================
    // PART 3: STRUCTURAL PATTERNS
    // ============================================================
    {
      type: 'section',
      title: 'Part 3: Structural Patterns — Composing Objects and Classes',
      content: 'Structural patterns deal with **how classes and objects are composed** to form larger structures, while keeping them flexible and efficient. These patterns are particularly relevant when integrating with legacy code or third-party libraries.'
    },

    // --- 3.1 Adapter ---
    {
      type: 'section',
      title: '3.1 Adapter — Making Incompatible Interfaces Work Together',
      content: 'Converts the interface of a class into another interface that clients expect. Allows classes to work together that couldn\'t otherwise because of incompatible interfaces.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Real-world example: Integrating a legacy payment system\n// Legacy API we cannot change\nclass LegacyPaymentProcessor {\n    public void process(double amount, String currency) { /* ... */ }\n}\n\n// Modern API expected by our system\ninterface PaymentGateway {\n    void pay(Money amount);\n}\n\n// Adapter bridges the gap\nclass LegacyPaymentAdapter implements PaymentGateway {\n    private final LegacyPaymentProcessor legacy;\n    \n    public LegacyPaymentAdapter(LegacyPaymentProcessor legacy) {\n        this.legacy = legacy;\n    }\n    \n    @Override\n    public void pay(Money amount) {\n        legacy.process(amount.getValue(), amount.getCurrency().getCode());\n    }\n}\n\n// Now the legacy system works through the modern interface\nPaymentGateway gateway = new LegacyPaymentAdapter(new LegacyPaymentProcessor());\ngateway.pay(Money.of(100, "USD"));'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'When to Use — and When NOT to Use — Adapter',
      content: '✅ **Use when**: You have a third-party or legacy class that doesn\'t match your current interface, and you can\'t change the original class. Also when you\'re integrating two systems with different APIs.\n\n❌ **AVOID when**: You control both sides — just redesign the interface instead. Also avoid when you\'re wrapping a class that has *different behavior* from what your interface expects — Adapter is for structural mismatch, not behavioral mismatch.\n\n💡 **Remember**: Adapter is a "shim" — it adds a layer of indirection. If you\'re already using a modern API, don\'t wrap it unnecessarily.\n\n🔗 **SOLID**: OCP, ISP.'
    },

    // --- 3.2 Decorator ---
    {
      type: 'section',
      title: '3.2 Decorator — Adding Responsibilities Dynamically',
      content: 'Attaches additional responsibilities to an object dynamically. Provides a flexible alternative to subclassing for extending functionality. The Java I/O classes are the classic example.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Decorator pattern in the JDK — Java I/O\nInputStream in = new GZIPInputStream(\n    new BufferedInputStream(\n        new FileInputStream("data.gz")\n    )\n);\n\n// Real-world example: Adding features to a data pipeline\ninterface DataSource {\n    void writeData(String data);\n    String readData();\n}\n\nclass FileDataSource implements DataSource {\n    // ... file-based implementation\n}\n\nabstract class DataSourceDecorator implements DataSource {\n    protected DataSource wrappee;\n    public DataSourceDecorator(DataSource source) { this.wrappee = source; }\n}\n\nclass EncryptionDecorator extends DataSourceDecorator {\n    public EncryptionDecorator(DataSource source) { super(source); }\n    \n    @Override\n    public void writeData(String data) {\n        wrappee.writeData(encrypt(data));\n    }\n    \n    @Override\n    public String readData() {\n        return decrypt(wrappee.readData());\n    }\n}\n\nclass CompressionDecorator extends DataSourceDecorator {\n    public CompressionDecorator(DataSource source) { super(source); }\n    \n    @Override\n    public void writeData(String data) {\n        wrappee.writeData(compress(data));\n    }\n    \n    @Override\n    public String readData() {\n        return decompress(wrappee.readData());\n    }\n}\n\n// Compose behaviors at runtime\ndataSource = new CompressionDecorator(\n    new EncryptionDecorator(\n        new FileDataSource("data.txt")\n    )\n);'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'When to Use — and When NOT to Use — Decorator',
      content: '✅ **Use when**: You need to add behavior to objects at runtime, and subclassing would create a combinatorial explosion of classes. Also when you want to compose behaviors (e.g., compression + encryption + logging).\n\n❌ **AVOID when**: The behavior is static and always required — subclassing or direct implementation is simpler. Also avoid when the decorators need to know about each other — that\'s a different pattern (Chain of Responsibility).\n\n💡 **Remember**: Decorator is about *composition*, not inheritance. If you find yourself adding many layers, consider whether the decorators should be separate components instead.\n\n🔗 **SOLID**: OCP, SRP, LSP.'
    },

    // --- 3.3 Proxy ---
    {
      type: 'section',
      title: '3.3 Proxy — Controlling Access to an Object',
      content: 'Provides a surrogate or placeholder for another object to control access to it. Common use cases: lazy loading, access control, logging, caching. Spring AOP and Hibernate proxies are real-world examples.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Real-world example: Lazy-loading a large image from storage\ninterface Image {\n    void display();\n}\n\nclass HighResolutionImage implements Image {\n    private final String filename;\n    \n    public HighResolutionImage(String filename) {\n        this.filename = filename;\n        loadFromDisk(); // Expensive operation\n    }\n    \n    private void loadFromDisk() { /* ... expensive */ }\n    \n    @Override\n    public void display() { /* ... */ }\n}\n\nclass LazyImageProxy implements Image {\n    private final String filename;\n    private HighResolutionImage realImage;\n    \n    public LazyImageProxy(String filename) { this.filename = filename; }\n    \n    @Override\n    public void display() {\n        if (realImage == null) {\n            realImage = new HighResolutionImage(filename); // Load only when needed\n        }\n        realImage.display();\n    }\n}\n\n// Usage — the image isn\'t loaded until display() is called\nImage image = new LazyImageProxy("vacation-photo.jpg");\n// ... much later\nimage.display(); // Now it loads'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'When to Use — and When NOT to Use — Proxy',
      content: '✅ **Use when**: You need lazy loading (expensive resources), access control (security checks), logging, or caching. Also when working with Hibernate/Spring proxies that manage transactions and lazy associations.\n\n❌ **AVOID when**: The overhead of the proxy isn\'t worth it (simple objects). Also avoid when you don\'t need any of the cross-cutting concerns that proxies provide.\n\n💡 **Remember**: Proxy and Decorator look similar, but Proxy *controls* access while Decorator *adds* behavior. If you\'re adding behavior, use Decorator. If you\'re managing access, use Proxy.\n\n🔗 **SOLID**: SRP, LSP.'
    },

    // --- 3.4 Facade ---
    {
      type: 'section',
      title: '3.4 Facade — Simplifying Complex Subsystems',
      content: 'Provides a unified, simplified interface to a set of interfaces in a subsystem. Hides the complexity from the client without eliminating the flexibility of the underlying components.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Real-world example: Order processing across multiple services\nclass OrderService { /* ... */ }\nclass PaymentService { /* ... */ }\nclass ShippingService { /* ... */ }\nclass NotificationService { /* ... */ }\n\n// Without Facade — client must coordinate everything\nOrderService orderService = new OrderService();\nPaymentService paymentService = new PaymentService();\nShippingService shippingService = new ShippingService();\nNotificationService notificationService = new NotificationService();\n\n// With Facade — one method hides all complexity\nclass OrderFacade {\n    private final OrderService orderService;\n    private final PaymentService paymentService;\n    private final ShippingService shippingService;\n    private final NotificationService notificationService;\n    \n    public void placeOrder(Order order, PaymentDetails payment) {\n        orderService.validate(order);\n        paymentService.process(payment);\n        shippingService.schedule(order);\n        notificationService.sendConfirmation(order);\n    }\n}\n\n// Client now has a single, simple interface\nnew OrderFacade().placeOrder(order, payment);'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'When to Use — and When NOT to Use — Facade',
      content: '✅ **Use when**: You have a complex subsystem and you want to provide a simplified interface for most clients. Also when you want to decouple clients from the subsystem\'s internal structure.\n\n❌ **AVOID when**: Clients need the full flexibility of the subsystem — a Facade can be too restrictive. Also avoid when you\'re simply "pushing complexity to a different place" — the Facade should genuinely simplify, not just relocate.\n\n💡 **Remember**: Facade is about *simplification*, not hiding. Good APIs are facades — they present a clean, focused interface while handling complexity internally.\n\n🔗 **SOLID**: ISP, SRP, LoD.'
    },

    // --- 3.5 Composite ---
    {
      type: 'section',
      title: '3.5 Composite — Treating Individual Objects and Compositions Uniformly',
      content: 'Lets clients treat individual objects and compositions of objects uniformly. Ideal for tree-like structures where leaf and composite nodes share the same interface — think file systems, UI component trees, or organizational hierarchies.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Real-world example: File system (files and directories)\ninterface FileSystemItem {\n    long getSize();\n    String getName();\n    void display(int indent);\n}\n\nclass File implements FileSystemItem {\n    private final String name;\n    private final long size;\n    \n    public File(String name, long size) { this.name = name; this.size = size; }\n    \n    @Override public long getSize() { return size; }\n    @Override public String getName() { return name; }\n    @Override public void display(int indent) {\n        System.out.println("  ".repeat(indent) + "📄 " + name + " (" + size + " bytes)");\n    }\n}\n\nclass Directory implements FileSystemItem {\n    private final String name;\n    private final List<FileSystemItem> children = new ArrayList<>();\n    \n    public Directory(String name) { this.name = name; }\n    \n    public void add(FileSystemItem item) { children.add(item); }\n    public void remove(FileSystemItem item) { children.remove(item); }\n    \n    @Override\n    public long getSize() {\n        return children.stream().mapToLong(FileSystemItem::getSize).sum();\n    }\n    \n    @Override\n    public String getName() { return name; }\n    \n    @Override\n    public void display(int indent) {\n        System.out.println("  ".repeat(indent) + "📁 " + name);\n        for (FileSystemItem child : children) {\n            child.display(indent + 1);\n        }\n    }\n}\n\n// Usage\nDirectory root = new Directory("root");\nroot.add(new File("readme.md", 1024));\nDirectory docs = new Directory("docs");\ndocs.add(new File("guide.pdf", 2048));\nroot.add(docs);\nroot.display(0); // Prints the entire tree'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'When to Use — and When NOT to Use — Composite',
      content: '✅ **Use when**: You have a tree structure where nodes and leaves should be treated uniformly. Also when you want to perform operations on the entire structure (e.g., calculating total size, rendering all items).\n\n❌ **AVOID when**: Your structure is flat (no nesting). Also avoid when the leaf and composite behaviors are fundamentally different and forcing a common interface creates unnatural abstractions.\n\n💡 **Remember**: Composite is about *uniform treatment*. If clients always need to know whether they\'re dealing with a leaf or a composite, the pattern isn\'t delivering its value.\n\n🔗 **SOLID**: OCP, LSP, ISP.'
    },

    // --- 3.6 Bridge ---
    {
      type: 'section',
      title: '3.6 Bridge — Decoupling Abstraction from Implementation',
      content: 'Decouples an abstraction from its implementation so the two can vary independently. Where Adapter retrofits an existing incompatible interface after the fact, Bridge is designed in from the start specifically to let two independent class hierarchies — an abstraction hierarchy and an implementation hierarchy — evolve separately without either one being locked to the other.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Real-world example: cross-channel notification system\ninterface NotificationImplementor {\n    void sendMessage(String title, String body);\n}\n\nclass EmailImplementor implements NotificationImplementor {\n    @Override\n    public void sendMessage(String title, String body) {\n        System.out.println("📧 Email: " + title + " - " + body);\n    }\n}\n\nclass SmsImplementor implements NotificationImplementor {\n    @Override\n    public void sendMessage(String title, String body) {\n        System.out.println("📱 SMS: " + title + " - " + body);\n    }\n}\n\n// Abstraction hierarchy — varies independently of the implementation hierarchy\nabstract class Notification {\n    protected final NotificationImplementor implementor;\n    protected Notification(NotificationImplementor implementor) { this.implementor = implementor; }\n    public abstract void notifyUser(String message);\n}\n\nclass UrgentNotification extends Notification {\n    public UrgentNotification(NotificationImplementor implementor) { super(implementor); }\n    @Override\n    public void notifyUser(String message) {\n        implementor.sendMessage("URGENT", message);\n    }\n}\n\n// Any abstraction can pair with any implementor — combinations grow additively, not multiplicatively\nNotification urgentEmail = new UrgentNotification(new EmailImplementor());\nurgentEmail.notifyUser("Server is down");'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'When to Use — and When NOT to Use — Bridge',
      content: '✅ **Use when**: You have two dimensions of variation (e.g., notification urgency × delivery channel) that would otherwise explode into a class for every combination. Also when you need to swap an implementation at runtime without touching the abstraction.\n\n❌ **AVOID when**: You only have one dimension of variation — a simple interface hierarchy is enough.\n\n💡 **Remember**: Bridge prevents a combinatorial class explosion. If AbstractionA × ImplementationB would otherwise require its own class for every pairing, Bridge is the fix. Don\'t confuse it with Adapter: Bridge is designed upfront so two hierarchies can vary together; Adapter is retrofitted afterward to reconcile one that already exists.\n\n🔗 **SOLID**: OCP.'
    },

    // --- 3.7 Flyweight ---
    {
      type: 'section',
      title: '3.7 Flyweight — Sharing Fine-Grained Objects to Save Memory',
      content: 'Minimizes memory usage by sharing as much data as possible with other similar objects. Flyweight splits an object\'s state into intrinsic state (shared, immutable, context-independent — safe to reuse across every instance) and extrinsic state (unique per use, supplied by the client at the point of use rather than stored). Java\'s own Integer cache and String pool are Flyweight in production use — this is precisely the mechanism responsible for the classic `Integer.valueOf(127) == Integer.valueOf(127)` caching gotcha.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Real-world example: rendering millions of trees in a forest simulation\n// Intrinsic state (shared): the tree species\' mesh and texture — identical for every instance\nclass TreeType {\n    private final String name;\n    private final String mesh;    // Expensive to load — shared across every tree of this type\n    private final String texture;\n\n    public TreeType(String name, String mesh, String texture) {\n        this.name = name; this.mesh = mesh; this.texture = texture;\n    }\n\n    public void render(int x, int y) { // Extrinsic state (x, y) supplied per call, never stored\n        System.out.println("Rendering " + name + " at (" + x + ", " + y + ")");\n    }\n}\n\n// Factory ensures each TreeType is created once and reused\nclass TreeTypeFactory {\n    private static final Map<String, TreeType> CACHE = new HashMap<>();\n\n    public static TreeType get(String name, String mesh, String texture) {\n        return CACHE.computeIfAbsent(name, k -> new TreeType(name, mesh, texture));\n    }\n}\n\n// A million Tree instances share only a handful of TreeType flyweights\nclass Tree {\n    private final int x, y;\n    private final TreeType type; // Shared flyweight, never duplicated per tree\n\n    public Tree(int x, int y, TreeType type) { this.x = x; this.y = y; this.type = type; }\n    public void render() { type.render(x, y); }\n}'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'When to Use — and When NOT to Use — Flyweight',
      content: '✅ **Use when**: You need to instantiate an enormous number of objects that share large amounts of identical, immutable data (rendering engines, per-character text formatting, caching parsed configuration).\n\n❌ **AVOID when**: The object count is modest — the added indirection and factory bookkeeping cost more than the memory you would save. Also avoid when the "shared" state isn\'t actually immutable — mutable shared state reintroduces exactly the bugs a well-designed cache should prevent.\n\n💡 **Remember**: Flyweight is a memory-architecture pattern first and a design pattern second — always separate intrinsic (shared) state from extrinsic (per-use) state before reaching for it.\n\n🔗 **SOLID**: OCP.'
    },

    // ============================================================
    // PART 4: BEHAVIORAL PATTERNS
    // ============================================================
    {
      type: 'section',
      title: 'Part 4: Behavioral Patterns — Managing Interactions and Responsibilities',
      content: 'Behavioral patterns define **how objects interact and distribute responsibility**. These patterns are the most diverse and, in many ways, the most powerful because they directly address how your system\'s behavior evolves over time. In modern Java, lambdas and functional interfaces have fundamentally changed how we implement many of them.'
    },

    // --- 4.1 Strategy ---
    {
      type: 'section',
      title: '4.1 Strategy — Encapsulating Interchangeable Algorithms',
      content: 'Defines a family of algorithms, encapsulates each one, and makes them interchangeable. In Java 8+, Strategy is often implemented with a single lambda instead of a full class hierarchy.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Real-world example: Shipping cost calculation\ninterface ShippingStrategy {\n    double calculate(double weight, double distance);\n}\n\n// Classic Strategy implementation\nclass StandardShipping implements ShippingStrategy {\n    @Override\n    public double calculate(double weight, double distance) {\n        return weight * 0.5 + distance * 0.1;\n    }\n}\n\nclass ExpressShipping implements ShippingStrategy {\n    @Override\n    public double calculate(double weight, double distance) {\n        return weight * 1.0 + distance * 0.3;\n    }\n}\n\n// Modern Java — Strategy as a lambda (functional programming)\n// Instead of creating classes, use a functional interface directly\n@FunctionalInterface\ninterface ShippingStrategy {\n    double calculate(double weight, double distance);\n}\n\n// Now strategies are just lambdas\nShippingStrategy standard = (w, d) -> w * 0.5 + d * 0.1;\nShippingStrategy express = (w, d) -> w * 1.0 + d * 0.3;\n\n// Or method references\nShippingStrategy bulkDiscount = this::calculateBulkShipping;\n\n// Context that uses the strategy\nclass OrderCalculator {\n    private ShippingStrategy strategy;\n    \n    public void setStrategy(ShippingStrategy strategy) {\n        this.strategy = strategy;\n    }\n    \n    public double calculateTotal(double weight, double distance) {\n        return strategy.calculate(weight, distance);\n    }\n}'
    },
    {
      type: 'callout',
      tone: 'success',
      title: 'Lambdas Changed Strategy Forever',
      content: 'Before Java 8, every Strategy required a new class. Today, Strategy is often just a lambda or method reference. The *intent* remains the same, but the *mechanism* is vastly simpler.\n\n✅ **Use when**: You have multiple algorithms that can be swapped at runtime.\n\n❌ **AVOID when**: The algorithm is fixed and never changes — a simple method is clearer.\n\n💡 **Remember**: Strategy is about *varying behavior*. If behavior doesn\'t vary, you don\'t need Strategy.\n\n🔗 **SOLID**: OCP, SRP, LSP, DIP.'
    },

    // --- 4.2 Observer ---
    {
      type: 'section',
      title: '4.2 Observer — Notifying Dependents of State Changes',
      content: 'Defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically. It is the foundation of event-driven architectures, GUI listeners, and reactive programming.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Real-world example: Stock price monitoring\ninterface StockObserver {\n    void onPriceChange(String symbol, double price);\n}\n\nclass Stock {\n    private final String symbol;\n    private double price;\n    private final List<StockObserver> observers = new ArrayList<>();\n    \n    public Stock(String symbol, double price) { this.symbol = symbol; this.price = price; }\n    \n    public void attach(StockObserver observer) { observers.add(observer); }\n    public void detach(StockObserver observer) { observers.remove(observer); }\n    \n    public void setPrice(double price) {\n        this.price = price;\n        notifyObservers();\n    }\n    \n    private void notifyObservers() {\n        for (StockObserver observer : observers) {\n            observer.onPriceChange(symbol, price);\n        }\n    }\n}\n\nclass AlertSystem implements StockObserver {\n    @Override\n    public void onPriceChange(String symbol, double price) {\n        if (price > 1000) {\n            System.out.println("⚠️ Alert: " + symbol + " exceeded 1000!");\n        }\n    }\n}\n\nclass LoggerSystem implements StockObserver {\n    @Override\n    public void onPriceChange(String symbol, double price) {\n        System.out.println("📊 Log: " + symbol + " = " + price);\n    }\n}\n\n// Usage\nStock stock = new Stock("AAPL", 150.0);\nstock.attach(new AlertSystem());\nstock.attach(new LoggerSystem());\nstock.setPrice(1050.0); // Both systems react'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'When to Use — and When NOT to Use — Observer',
      content: '✅ **Use when**: You have a one-to-many relationship where changes in one object trigger updates in others (GUI events, stock tickers, pub-sub systems).\n\n❌ **AVOID when**: The notification is synchronous and the observers are tightly coupled to the subject — performance can degrade with many observers. Also avoid when observers depend on order of execution — that\'s a different pattern (Chain of Responsibility).\n\n💡 **Remember**: In modern Java, the `Flow` API (Java 9+) provides a standard implementation, and reactive streams (RxJava, Project Reactor) have largely superseded manual Observer implementations.\n\n🔗 **SOLID**: OCP, SRP, DIP, LSP.'
    },

    // --- 4.3 Command ---
    {
      type: 'section',
      title: '4.3 Command — Encapsulating Requests as Objects',
      content: 'Encapsulates a request as an object, thereby letting you parameterize clients with different requests, queue or log requests, and support undoable operations. Widely used in GUI frameworks, job schedulers, and transaction systems.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Real-world example: Smart home remote control with undo\ninterface SmartHomeCommand {\n    void execute();\n    void undo();\n}\n\nclass Light {\n    private boolean isOn;\n    public void turnOn() { isOn = true; System.out.println("💡 Light ON"); }\n    public void turnOff() { isOn = false; System.out.println("💡 Light OFF"); }\n    public boolean isOn() { return isOn; }\n}\n\nclass LightOnCommand implements SmartHomeCommand {\n    private final Light light;\n    public LightOnCommand(Light light) { this.light = light; }\n    \n    @Override\n    public void execute() { light.turnOn(); }\n    \n    @Override\n    public void undo() { light.turnOff(); }\n}\n\nclass Thermostat {\n    private int temperature;\n    public void setTemperature(int temp) { this.temperature = temp; System.out.println("🌡️ Temp set to " + temp); }\n    public int getTemperature() { return temperature; }\n}\n\nclass SetTemperatureCommand implements SmartHomeCommand {\n    private final Thermostat thermostat;\n    private final int newTemp;\n    private int previousTemp;\n    \n    public SetTemperatureCommand(Thermostat thermostat, int newTemp) {\n        this.thermostat = thermostat;\n        this.newTemp = newTemp;\n    }\n    \n    @Override\n    public void execute() {\n        previousTemp = thermostat.getTemperature();\n        thermostat.setTemperature(newTemp);\n    }\n    \n    @Override\n    public void undo() {\n        thermostat.setTemperature(previousTemp);\n    }\n}\n\nclass RemoteControl {\n    private final Stack<SmartHomeCommand> history = new Stack<>();\n    \n    public void press(SmartHomeCommand command) {\n        command.execute();\n        history.push(command);\n    }\n    \n    public void undo() {\n        if (!history.isEmpty()) {\n            history.pop().undo();\n        }\n    }\n}\n\n// Usage\nRemoteControl remote = new RemoteControl();\nLight light = new Light();\nremote.press(new LightOnCommand(light));\nremote.undo(); // Undoes the last command'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'When to Use — and When NOT to Use — Command',
      content: '✅ **Use when**: You need to support undo/redo, queue operations, log requests, or parameterize clients with different requests. Also when building transaction systems (e.g., banking operations).\n\n❌ **AVOID when**: You don\'t need any of the above — a simple method call is clearer. Also avoid when commands have no meaningful undo semantics.\n\n💡 **Remember**: Command is about *encapsulating actions*. If you only have one type of action, the complexity isn\'t worth it.\n\n🔗 **SOLID**: SRP, OCP, DIP.'
    },

    // --- 4.4 Template Method ---
    {
      type: 'section',
      title: '4.4 Template Method — Defining the Skeleton of an Algorithm',
      content: 'Defines the skeleton of an algorithm in a method, deferring some steps to subclasses. Common in frameworks and libraries where the overall workflow is fixed but specific steps vary.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Real-world example: Data migration pipeline\nabstract class DataPipeline {\n    // Template method — defines the algorithm structure\n    public final void run() {\n        extract();\n        transform();\n        validate();\n        load();\n        cleanup();\n    }\n    \n    protected abstract void extract();\n    protected abstract void transform();\n    protected void validate() { /* default validation — can be overridden */ }\n    protected abstract void load();\n    protected void cleanup() { /* default cleanup */ }\n}\n\nclass ETLPipeline extends DataPipeline {\n    @Override\n    protected void extract() { System.out.println("📥 Extracting from source"); }\n    \n    @Override\n    protected void transform() { System.out.println("🔄 Transforming data"); }\n    \n    @Override\n    protected void load() { System.out.println("📤 Loading to target"); }\n    \n    @Override\n    protected void validate() {\n        System.out.println("✅ Validating data integrity");\n    }\n}\n\n// Usage — the algorithm structure is enforced\nnew ETLPipeline().run();'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'When to Use — and When NOT to Use — Template Method',
      content: '✅ **Use when**: You have a fixed algorithm structure that should be reused, but some steps need to vary by subclass. Common in frameworks (JUnit, servlets, Spring\'s `JdbcTemplate`).\n\n❌ **AVOID when**: The algorithm structure changes frequently — Template Method is inflexible. Also avoid when you could achieve the same with composition and functional interfaces (Strategy pattern). In modern Java, consider whether functional composition is more flexible than inheritance.\n\n💡 **Remember**: Template Method is about *algorithm structure*. If the structure changes often, it\'s not a good fit.\n\n🔗 **SOLID**: OCP, LSP, SRP.'
    },

    // --- 4.5 Chain of Responsibility ---
    {
      type: 'section',
      title: '4.5 Chain of Responsibility — Passing Requests Along a Chain',
      content: 'Passes a request along a chain of potential handlers until one of them handles it. Decouples the sender of a request from its receiver. Useful for logging, authentication, validation pipelines, and GUI event bubbling.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Real-world example: HTTP request validation chain\nabstract class RequestHandler {\n    protected RequestHandler next;\n    \n    public RequestHandler setNext(RequestHandler next) {\n        this.next = next;\n        return next;\n    }\n    \n    public abstract void handle(HttpRequest request);\n}\n\nclass AuthenticationHandler extends RequestHandler {\n    @Override\n    public void handle(HttpRequest request) {\n        if (!request.hasValidToken()) {\n            throw new SecurityException("❌ Authentication failed");\n        }\n        System.out.println("✅ Authentication passed");\n        if (next != null) next.handle(request);\n    }\n}\n\nclass RateLimitHandler extends RequestHandler {\n    @Override\n    public void handle(HttpRequest request) {\n        if (isRateLimited(request)) {\n            throw new RuntimeException("⏳ Rate limit exceeded");\n        }\n        System.out.println("✅ Rate limit passed");\n        if (next != null) next.handle(request);\n    }\n}\n\nclass LoggingHandler extends RequestHandler {\n    @Override\n    public void handle(HttpRequest request) {\n        System.out.println("📝 Logging: " + request.getPath());\n        if (next != null) next.handle(request);\n    }\n}\n\n// Building the chain — flexible order\nRequestHandler chain = new AuthenticationHandler();\nchain.setNext(new RateLimitHandler())\n     .setNext(new LoggingHandler());\n\nchain.handle(request);'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'When to Use — and When NOT to Use — Chain of Responsibility',
      content: '✅ **Use when**: You have multiple handlers that may process a request in sequence, and the order is flexible or dynamic. Also when you want to decouple the sender from the receiver (validation pipelines, logging middleware).\n\n❌ **AVOID when**: The order is fixed and never changes — a simple fixed pipeline is simpler. Also avoid when all handlers must always process the request (Command pattern is better).\n\n💡 **Remember**: Chain of Responsibility is about *dynamic composition of handlers*. If the chain is always the same, you\'re just adding overhead.\n\n🔗 **SOLID**: SRP, OCP, DIP.'
    },

    // --- 4.6 State ---
    {
      type: 'section',
      title: '4.6 State — Allowing an Object to Change Behavior When Its State Changes',
      content: 'Allows an object to alter its behavior when its internal state changes. The object will appear to change its class. This is a cleaner alternative to large conditional statements that check state variables.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Real-world example: Order workflow\ninterface OrderState {\n    void next(Order order);\n    void cancel(Order order);\n    String getStatus();\n}\n\nclass PendingState implements OrderState {\n    @Override\n    public void next(Order order) {\n        System.out.println("📦 Order shipped");\n        order.setState(new ShippedState());\n    }\n    \n    @Override\n    public void cancel(Order order) {\n        System.out.println("❌ Order cancelled");\n        order.setState(new CancelledState());\n    }\n    \n    @Override\n    public String getStatus() { return "PENDING"; }\n}\n\nclass ShippedState implements OrderState {\n    @Override\n    public void next(Order order) {\n        System.out.println("📦 Order delivered");\n        order.setState(new DeliveredState());\n    }\n    \n    @Override\n    public void cancel(Order order) {\n        throw new IllegalStateException("Cannot cancel a shipped order");\n    }\n    \n    @Override\n    public String getStatus() { return "SHIPPED"; }\n}\n\nclass DeliveredState implements OrderState {\n    @Override\n    public void next(Order order) {\n        System.out.println("⏳ Order is already delivered");\n    }\n    \n    @Override\n    public void cancel(Order order) {\n        throw new IllegalStateException("Cannot cancel a delivered order");\n    }\n    \n    @Override\n    public String getStatus() { return "DELIVERED"; }\n}\n\nclass CancelledState implements OrderState {\n    @Override\n    public void next(Order order) {\n        throw new IllegalStateException("Cannot progress a cancelled order");\n    }\n    \n    @Override\n    public void cancel(Order order) {\n        System.out.println("⏳ Order already cancelled");\n    }\n    \n    @Override\n    public String getStatus() { return "CANCELLED"; }\n}\n\nclass Order {\n    private OrderState state = new PendingState();\n    \n    public void setState(OrderState state) { this.state = state; }\n    public void next() { state.next(this); }\n    public void cancel() { state.cancel(this); }\n    public String getStatus() { return state.getStatus(); }\n}\n\n// Usage — behavior changes automatically with state\nOrder order = new Order();\norder.next(); // Shipped\norder.next(); // Delivered\norder.cancel(); // Throws exception — cannot cancel delivered order'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'When to Use — and When NOT to Use — State',
      content: '✅ **Use when**: You have an object whose behavior varies significantly based on its state, and the transitions between states are well-defined. Also when you have large conditionals (`if (state == X) {...} else if (state == Y) {...}`).\n\n❌ **AVOID when**: The behavior variation is small — simple booleans or enums are clearer. Also avoid when the state transitions are not well-defined or change frequently.\n\n💡 **Remember**: State is about *behavior changing with state*. If you\'re not changing behavior, you\'re just modeling data, not using the State pattern.\n\n🔗 **SOLID**: SRP, OCP, LSP.'
    },

    // --- 4.7 Iterator ---
    {
      type: 'section',
      title: '4.7 Iterator — Traversing Collections Without Exposing Internals',
      content: 'Provides a way to access the elements of an aggregate object sequentially without exposing its underlying representation. Every `for-each` loop in Java is powered by this exact pattern — any class implementing `Iterable<T>` supplies an `Iterator<T>` that hides whether the underlying structure is an array, a linked list, or a tree.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Real-world example: a custom collection with its own traversal order\nclass PriorityTaskQueue implements Iterable<String> {\n    private final List<String> items = new ArrayList<>();\n\n    public void add(String item) { items.add(item); Collections.sort(items); }\n\n    @Override\n    public Iterator<String> iterator() {\n        return new Iterator<String>() {\n            private int index = 0;\n            @Override public boolean hasNext() { return index < items.size(); }\n            @Override public String next() { return items.get(index++); }\n        };\n    }\n}\n\n// Client code never knows (or cares) that the internal storage is an ArrayList\nPriorityTaskQueue queue = new PriorityTaskQueue();\nqueue.add("low-priority"); queue.add("high-priority");\nfor (String task : queue) { // Powered entirely by the Iterator pattern\n    System.out.println(task);\n}'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'When to Use — and When NOT to Use — Iterator',
      content: '✅ **Use when**: You are building a custom collection type and want clients to traverse it with a standard `for-each` loop without knowing its internal storage structure.\n\n❌ **AVOID when**: You are only ever consuming standard JDK collections — `Iterable`/`Iterator` is already implemented for you; hand-writing your own is only needed when authoring a new collection type.\n\n💡 **Remember**: In modern Java, the Stream API frequently replaces manual `Iterator` usage entirely for read-and-transform pipelines — reach for `Iterator` when you\'re the one authoring a new collection type, not when you\'re consuming an existing one.\n\n🔗 **SOLID**: OCP, ISP.'
    },

    // --- 4.8 Mediator ---
    {
      type: 'section',
      title: '4.8 Mediator — Centralizing Complex Communications',
      content: 'Defines an object that encapsulates how a set of other objects interact, replacing a tangle of direct object-to-object references with a single mediator that every participant talks to instead of each other. This keeps individual components loosely coupled and reusable, at the cost of concentrating coordination logic into one place that can itself grow complex.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Real-world example: a chat room mediating between users instead of users messaging each other directly\ninterface ChatMediator {\n    void sendMessage(String message, User sender);\n    void addUser(User user);\n}\n\nclass ChatRoom implements ChatMediator {\n    private final List<User> users = new ArrayList<>();\n\n    @Override\n    public void addUser(User user) { users.add(user); }\n\n    @Override\n    public void sendMessage(String message, User sender) {\n        for (User user : users) {\n            if (user != sender) {\n                user.receive(message, sender.getName());\n            }\n        }\n    }\n}\n\nclass User {\n    private final String name;\n    private final ChatMediator mediator;\n\n    public User(String name, ChatMediator mediator) {\n        this.name = name; this.mediator = mediator;\n        mediator.addUser(this);\n    }\n\n    public String getName() { return name; }\n    public void send(String message) { mediator.sendMessage(message, this); }\n    public void receive(String message, String from) {\n        System.out.println(name + " received from " + from + ": " + message);\n    }\n}'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'When to Use — and When NOT to Use — Mediator',
      content: '✅ **Use when**: A group of objects communicate in complex, many-to-many ways, and you want to replace that web of direct references with one central coordinator (chat rooms, complex UI dialogs where widgets must react to each other, workflow orchestration).\n\n❌ **AVOID when**: The interactions are simple and few — introducing a Mediator for two objects that talk to each other once is pure overhead.\n\n💡 **Remember**: Mediator trades distributed coupling for centralized complexity. It\'s the right trade when the alternative is genuinely an unmanageable web of cross-references — not before.\n\n🔗 **SOLID**: OCP, LSP, LoD.'
    },

    // --- 4.9 Memento ---
    {
      type: 'section',
      title: '4.9 Memento — Capturing and Restoring Object State',
      content: 'Captures and externalizes an object\'s internal state without violating encapsulation, so the object can later be restored to that state. Memento is the natural companion to Command\'s undo functionality when a single command cannot cleanly reverse itself (e.g., a rich-text edit) — instead of computing an inverse operation, simply snapshot state before the change and restore it on undo.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Real-world example: snapshotting a text editor\'s content for undo\nclass EditorMemento {\n    private final String content; // Only the originator can read it\n    EditorMemento(String content) { this.content = content; }\n    String getContent() { return content; }\n}\n\nclass TextEditor {\n    private String content = "";\n\n    public void type(String text) { content += text; }\n    public String getContent() { return content; }\n\n    public EditorMemento save() { return new EditorMemento(content); } // Originator creates the snapshot\n    public void restore(EditorMemento memento) { this.content = memento.getContent(); }\n}\n\nclass EditorHistory { // Caretaker — stores mementos without inspecting their contents\n    private final Deque<EditorMemento> history = new ArrayDeque<>();\n    public void push(EditorMemento memento) { history.push(memento); }\n    public EditorMemento pop() { return history.pop(); }\n}\n\n// Usage\nTextEditor editor = new TextEditor();\nEditorHistory history = new EditorHistory();\n\nhistory.push(editor.save());\neditor.type("Hello, ");\nhistory.push(editor.save());\neditor.type("World!");\n\neditor.restore(history.pop()); // Back to "Hello, "'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'When to Use — and When NOT to Use — Memento',
      content: '✅ **Use when**: You need undo/snapshot capability but the operation that changed the object\'s state cannot be cleanly or safely reversed by re-running an inverse command.\n\n❌ **AVOID when**: State is large and snapshots would be taken frequently — naive Memento can consume significant memory; consider storing deltas instead of full snapshots at scale.\n\n💡 **Remember**: Memento preserves encapsulation — only the originator object can read or write a memento\'s internal content, while the caretaker (history stack) only stores and passes mementos around without ever inspecting them.\n\n🔗 **SOLID**: OCP.'
    },

    // --- 4.10 Visitor ---
    {
      type: 'section',
      title: '4.10 Visitor — Adding Operations Without Modifying Classes',
      content: 'Represents an operation to be performed on the elements of an object structure, letting you define a new operation without changing the classes of the elements it operates on. Classic Visitor relies on double dispatch — each element\'s `accept(visitor)` method calls back into the correct `visit(this)` overload — to work around Java\'s single-dispatch method resolution. Since Java 17, sealed interfaces combined with exhaustive pattern-matching `switch` expressions frequently replace hand-written Visitor entirely, letting the compiler — not a visitor class — guarantee every case is handled.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Classic Visitor: double dispatch across a shape hierarchy\ninterface ShapeVisitor {\n    double visit(Circle circle);\n    double visit(Rectangle rectangle);\n}\n\ninterface Shape {\n    double accept(ShapeVisitor visitor); // Double dispatch entry point\n}\n\nclass Circle implements Shape {\n    final double radius;\n    Circle(double radius) { this.radius = radius; }\n    @Override public double accept(ShapeVisitor visitor) { return visitor.visit(this); }\n}\n\nclass Rectangle implements Shape {\n    final double width, height;\n    Rectangle(double width, double height) { this.width = width; this.height = height; }\n    @Override public double accept(ShapeVisitor visitor) { return visitor.visit(this); }\n}\n\nclass AreaVisitor implements ShapeVisitor {\n    @Override public double visit(Circle c) { return Math.PI * c.radius * c.radius; }\n    @Override public double visit(Rectangle r) { return r.width * r.height; }\n}\n\n// Modern alternative: sealed interface + exhaustive pattern-matching switch (Java 21+)\nsealed interface ModernShape permits ModernCircle, ModernRectangle {}\nrecord ModernCircle(double radius) implements ModernShape {}\nrecord ModernRectangle(double width, double height) implements ModernShape {}\n\ndouble area(ModernShape shape) {\n    return switch (shape) { // Compiler enforces every permitted case is handled — no accept()/visit() boilerplate\n        case ModernCircle c -> Math.PI * c.radius() * c.radius();\n        case ModernRectangle r -> r.width() * r.height();\n    };\n}'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'When to Use — and When NOT to Use — Visitor',
      content: '✅ **Use when**: You need to add new operations frequently to a stable, rarely-changing class hierarchy without touching every class each time. Classic Visitor is still the right call pre-Java-17, or when the hierarchy is open (third parties can add new element types).\n\n❌ **AVOID when**: The hierarchy is closed and known upfront and you\'re on Java 17+ — sealed interfaces with pattern-matching switch expressions give you the same exhaustiveness guarantee with far less boilerplate.\n\n💡 **Remember**: Visitor optimizes for adding *operations* easily at the cost of making it hard to add new *element types* (every visitor implementation must be updated). Sealed classes plus pattern matching invert that trade-off — check which axis your domain actually changes along before picking either.\n\n🔗 **SOLID**: OCP, LSP.'
    },

    // --- 4.11 Interpreter ---
    {
      type: 'section',
      title: '4.11 Interpreter — Building Simple Language Grammars',
      content: 'Given a language, defines a representation for its grammar along with an interpreter that uses the representation to evaluate sentences in that language. Interpreter is the least commonly needed GoF pattern in everyday enterprise Java — most real-world parsing needs are better served by an existing parser-generator library or embedding an existing scripting language — but understanding it clarifies how simple expression evaluators, rule engines, and configuration-file DSLs are built internally.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Real-world example: a minimal boolean rule engine for feature flags\ninterface Expression {\n    boolean interpret(Map<String, Boolean> context);\n}\n\nclass VariableExpression implements Expression {\n    private final String name;\n    VariableExpression(String name) { this.name = name; }\n    @Override public boolean interpret(Map<String, Boolean> context) {\n        return context.getOrDefault(name, false);\n    }\n}\n\nclass AndExpression implements Expression {\n    private final Expression left, right;\n    AndExpression(Expression left, Expression right) { this.left = left; this.right = right; }\n    @Override public boolean interpret(Map<String, Boolean> context) {\n        return left.interpret(context) && right.interpret(context);\n    }\n}\n\n// Building and evaluating: "betaEnabled AND premiumUser"\nExpression rule = new AndExpression(\n    new VariableExpression("betaEnabled"),\n    new VariableExpression("premiumUser")\n);\n\nboolean allowed = rule.interpret(Map.of("betaEnabled", true, "premiumUser", true)); // true'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'When to Use — and When NOT to Use — Interpreter',
      content: '✅ **Use when**: You have a small, stable grammar to evaluate repeatedly (feature-flag rules, simple filter expressions, arithmetic in a spreadsheet cell) and a full parser-generator would be overkill.\n\n❌ **AVOID when**: The grammar is anything beyond trivial — hand-rolled Interpreter trees scale poorly; reach for ANTLR, an existing expression-language library, or an embedded scripting engine instead.\n\n💡 **Remember**: This is the pattern you will read about far more often than you will write in production enterprise Java — most teams correctly outsource real parsing to a dedicated library rather than hand-building an Interpreter hierarchy.\n\n🔗 **SOLID**: OCP.'
    },

    // ============================================================
    // PART 5: HOW MODERN JAVA RESHAPES CLASSIC PATTERNS
    // ============================================================
    {
      type: 'section',
      title: 'Part 5: How Modern Java Reshapes Classic Patterns',
      content: 'Several GoF patterns exist specifically to work around gaps in older versions of Java. As the language has gained records, sealed classes, pattern matching, and a rich Stream API, some patterns have shrunk from a multi-class hierarchy down to a single language feature — recognizing which is which prevents you from over-engineering with a classic pattern where a modern feature already does the job.'
    },
    {
      type: 'table',
      columns: ['Classic Pattern', 'Modern Java Feature', 'What Changed'],
      rows: [
        ['Strategy', 'Lambdas & method references', 'A functional interface plus a lambda replaces an entire family of single-method Strategy classes.'],
        ['Builder (simple cases)', 'Records with compact constructors', 'A record with a handful of components and validation logic often removes the need for a separate Builder class entirely.'],
        ['Visitor', 'Sealed interfaces + pattern-matching switch', 'The compiler enforces exhaustive handling of every permitted subtype directly in a switch expression, without accept()/visit() boilerplate.'],
        ['Iterator (consumption side)', 'Stream API', 'Read-and-transform traversal is usually expressed as a stream pipeline rather than a manual Iterator loop — though Iterator itself still powers for-each under the hood.'],
        ['Singleton', 'Dependency injection containers (Spring, CDI)', 'Instance lifecycle and scope are managed declaratively by the container instead of hand-rolled static state.'],
        ['Template Method', 'Functional composition (behavior passed as parameters)', 'Fixed algorithm skeletons can often be expressed as a method taking one or more functional-interface parameters instead of requiring subclassing.']
      ]
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'A Feature Is Not Automatically Better Than a Pattern',
      content: 'These modern replacements are not universally superior — Strategy classes are still the right call when an implementation needs its own state and multiple methods, and classic Visitor is still correct for open, third-party-extensible hierarchies. Recognize the trade-off in each row rather than treating the "modern" column as a strict upgrade.'
    },

    // ============================================================
    // PART 6: BEYOND GOF — EVERYDAY ENTERPRISE PATTERNS
    // ============================================================
    {
      type: 'section',
      title: 'Part 6: Beyond GoF — Everyday Enterprise Patterns',
      content: 'The original 23 Gang-of-Four patterns predate dependency-injection containers, and a couple of patterns that working Java developers rely on daily were formalized outside that catalog entirely. No "zero to hero" understanding of enterprise Java design is complete without them.'
    },

    // --- 6.1 Dependency Injection ---
    {
      type: 'section',
      title: '6.1 Dependency Injection — Inverting Who Constructs Your Dependencies',
      content: 'Rather than a class constructing its own collaborators (tightly coupling it to concrete implementations), dependencies are supplied — "injected" — from the outside, typically through the constructor. This is the practical, everyday application of the Dependency Inversion Principle from Part 1, and it is precisely why frameworks like Spring recommend constructor injection over field injection: constructor injection makes required dependencies explicit, immutable, and trivially mockable in unit tests.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Tightly coupled — hard to test, hard to swap implementations\nclass OrderService {\n    private final PaymentGateway gateway = new StripePaymentGateway(); // Hardcoded concrete class\n}\n\n// Constructor injection — the class depends on an abstraction, supplied from outside\nclass OrderService {\n    private final PaymentGateway gateway;\n\n    public OrderService(PaymentGateway gateway) { // Injected — easy to substitute a test double\n        this.gateway = gateway;\n    }\n}\n\n// In a Spring application, the container wires the concrete implementation automatically\n@Service\nclass SpringOrderService {\n    private final PaymentGateway gateway;\n\n    @Autowired // Constructor injection — the recommended style; field injection is discouraged\n    public SpringOrderService(PaymentGateway gateway) {\n        this.gateway = gateway;\n    }\n}'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'When to Use — and When NOT to Use — Dependency Injection',
      content: '✅ **Use when**: Virtually always, in any class with a non-trivial collaborator — it is the default, not the exception, in modern enterprise Java.\n\n❌ **AVOID when**: You are writing a small, self-contained utility with no meaningful external collaborators to swap.\n\n💡 **Remember**: This is the pattern that makes Singleton mostly unnecessary in frameworks like Spring — let the container manage a shared instance\'s lifecycle instead of hand-rolling static state.\n\n🔗 **SOLID**: DIP.'
    },

    // --- 6.2 Null Object ---
    {
      type: 'section',
      title: '6.2 Null Object — Replacing Null Checks with a Do-Nothing Implementation',
      content: 'Provides an object with neutral ("do nothing") behavior in place of a null reference, so client code can call methods on it unconditionally instead of scattering `if (x != null)` checks throughout the codebase. It implements the same interface as the real object, but every method is a safe no-op or returns an empty/default result.'
    },
    {
      type: 'code',
      language: 'java',
      code: 'interface Logger {\n    void log(String message);\n}\n\nclass ConsoleLogger implements Logger {\n    @Override public void log(String message) { System.out.println(message); }\n}\n\nclass NullLogger implements Logger { // Null Object — safe to call, does nothing\n    @Override public void log(String message) { /* intentionally does nothing */ }\n}\n\nclass Service {\n    private final Logger logger;\n\n    // Never null — falls back to the Null Object instead of null\n    public Service(Logger logger) {\n        this.logger = (logger != null) ? logger : new NullLogger();\n    }\n\n    public void doWork() {\n        logger.log("Working..."); // No null check needed here, ever\n    }\n}'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'When to Use — and When NOT to Use — Null Object',
      content: '✅ **Use when**: A collaborator is genuinely optional and its absence should mean "do nothing," not "crash" — optional loggers, no-op event listeners, empty-cart states.\n\n❌ **AVOID when**: The absence of a value is meaningful and callers genuinely need to distinguish "no value" from "a value that does nothing" — in that case, `Optional<T>` communicates absence explicitly and is usually the better modern choice.\n\n💡 **Remember**: `Optional.empty()` combined with `orElseGet()`/`ifPresentOrElse()` often achieves the same "no more null checks" goal for return values — Null Object remains most valuable for injected collaborators that need to be called unconditionally, not for return types.\n\n🔗 **SOLID**: LSP, OCP.'
    },

    // ============================================================
    // PART 7: PATTERN DECISION TREE
    // ============================================================
    {
      type: 'section',
      title: 'Part 7: Pattern Decision Tree — Which Pattern Should I Use?',
      content: 'This decision tree helps you choose the right pattern based on your actual problem. Start at the top and follow the path that matches your situation.'
    },
    {
      type: 'checklist',
      title: 'How to Choose the Right Pattern',
      items: [
        '**I need to create objects, but the exact type isn\'t known until runtime.**\n→ Use: **Factory Method** (if you have subclasses) or **Abstract Factory** (if you have families of objects).\n\n**I need to avoid long constructors with many optional parameters.**\n→ Use: **Builder**.\n\n**I need exactly one instance of a class, enforced by the system.**\n→ Use: **Singleton** (rarely — prefer DI).\n\n**I need to add behavior to objects at runtime without subclassing.**\n→ Use: **Decorator**.\n\n**I need to make two incompatible interfaces work together.**\n→ Use: **Adapter**.\n\n**I need a simplified interface to a complex subsystem.**\n→ Use: **Facade**.\n\n**I have a tree structure and want to treat leaves and branches uniformly.**\n→ Use: **Composite**.\n\n**I need to control access to an object (lazy loading, caching, security).**\n→ Use: **Proxy**.\n\n**I have two independent dimensions of variation that would otherwise explode into a class per combination.**\n→ Use: **Bridge**.\n\n**I need to instantiate huge numbers of objects that mostly share identical, immutable data.**\n→ Use: **Flyweight**.\n\n**I have multiple interchangeable algorithms.**\n→ Use: **Strategy** (or a lambda in modern Java).\n\n**I need to notify multiple objects when one changes.**\n→ Use: **Observer** (or reactive streams/event bus).\n\n**I need to queue, log, or undo operations.**\n→ Use: **Command**.\n\n**I have a fixed algorithm structure with variable steps.**\n→ Use: **Template Method** (or functional composition).\n\n**I need to pass a request through a chain of handlers.**\n→ Use: **Chain of Responsibility**.\n\n**I have an object whose behavior changes based on its state.**\n→ Use: **State**.\n\n**I am building a custom collection and want clients to traverse it with a standard for-each loop.**\n→ Use: **Iterator**.\n\n**Many objects need to communicate in a tangled many-to-many way.**\n→ Use: **Mediator**.\n\n**I need undo/snapshot capability but the change can\'t be cleanly reversed by an inverse command.**\n→ Use: **Memento**.\n\n**I need to add new operations to a stable class hierarchy without modifying every class.**\n→ Use: **Visitor** (or sealed interfaces + pattern matching on Java 17+).\n\n**I need to evaluate a small, stable grammar repeatedly.**\n→ Use: **Interpreter** (or, more often in practice, an existing parser library).\n\n**A class has a non-trivial collaborator it shouldn\'t construct itself.**\n→ Use: **Dependency Injection**.\n\n**A collaborator is optional and its absence should mean "do nothing."**\n→ Use: **Null Object** (or `Optional` for return values).'
      ]
    },

    // ============================================================
    // PART 8: ANTI-PATTERNS AND PITFALLS
    // ============================================================
    {
      type: 'section',
      title: 'Part 8: Anti-Patterns and Common Pitfalls — What to Avoid',
      content: 'Knowing patterns is only half the battle. Knowing **when not to use them** — and recognizing the traps that even experienced developers fall into — is what separates senior engineers from the rest.'
    },
    {
      type: 'checklist',
      title: 'The Most Common Design Pattern Mistakes',
      items: [
        '**The Golden Hammer**: Using a design pattern for every problem because you just learned it. Not every problem requires a pattern — sometimes a simple `if` statement or loop is the right answer.',
        '**Premature Pattern Application**: Applying patterns before you understand the problem. Patterns should *emerge* from refactoring, not be imposed from the start.',
        '**Singleton Abuse**: Using Singleton for global state that should be injected. Singleton creates hidden coupling and makes testing difficult. Prefer dependency injection.',
        '**Over-Engineering**: Creating a full Abstract Factory hierarchy when a simple factory method would suffice. Start simple and refactor toward patterns as complexity grows.',
        '**Misapplied Inheritance**: Using inheritance to reuse code rather than to model an "is-a" relationship. This violates LSP and often leads to fragile base class problems.',
        '**Ignoring Java Language Evolution**: Writing Singleton with double-checked locking when enums or the holder pattern are simpler and safer. Using Template Method with inheritance when functional composition would be more flexible. Hand-rolling Visitor on Java 17+ when a sealed interface and pattern-matching switch would be exhaustive and boilerplate-free.',
        '**Premature Flyweight**: Introducing a shared-object cache before profiling shows real memory pressure from object volume — most classes never need this optimization, and it adds real complexity when applied speculatively.',
        '**Pattern as Silver Bullet**: Believing that a pattern guarantees good design. Patterns are tools — they can be misused, overused, or applied in the wrong context.'
      ]
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'The Senior Developer\'s Rule',
      content: 'A pattern is a solution to a problem in a **specific context**. If the context is different, the pattern may not apply. Always ask: "What problem am I actually solving?" and "Does this pattern make the code simpler or more complex?" The answer should always be "simpler" — if it\'s not, you\'re probably using the wrong pattern or using it at the wrong time.'
    },

    // ============================================================
    // PART 9: QUICK CHEAT SHEET
    // ============================================================
    {
      type: 'table',
      columns: ['Category', 'Pattern', 'One-Liner (When to Use)', 'When NOT to Use', 'SOLID'],
      rows: [
        ['Creational', 'Singleton', 'Global, stateless, system-wide components', 'As a DI substitute, or when state is mutable', 'SRP'],
        ['Creational', 'Builder', 'Many optional parameters, complex construction', 'Simple objects with 1-2 parameters', 'SRP, ISP'],
        ['Creational', 'Factory Method', 'Defer creation to subclasses', 'Trivial creation that never varies', 'OCP, DIP'],
        ['Creational', 'Abstract Factory', 'Families of related products', 'Only one product family', 'OCP, DIP, ISP'],
        ['Creational', 'Prototype', 'Expensive construction, need variations', 'Cheap construction, complex circular references', 'OCP'],
        ['Structural', 'Adapter', 'Incompatible interfaces that can\'t change', 'You control both sides', 'OCP, ISP'],
        ['Structural', 'Decorator', 'Dynamic behavior addition without subclassing', 'Static, always-required behavior', 'OCP, SRP, LSP'],
        ['Structural', 'Proxy', 'Lazy loading, access control, caching', 'Simple objects, no cross-cutting concerns', 'SRP, LSP'],
        ['Structural', 'Facade', 'Simplifying complex subsystems', 'Clients need full flexibility', 'ISP, SRP, LoD'],
        ['Structural', 'Composite', 'Tree structures, uniform handling', 'Flat structures, unnatural common interface', 'OCP, LSP, ISP'],
        ['Structural', 'Bridge', 'Two independent dimensions of variation', 'Only one dimension of variation', 'OCP'],
        ['Structural', 'Flyweight', 'Huge object counts sharing immutable data', 'Modest object counts, or mutable "shared" state', 'OCP'],
        ['Behavioral', 'Strategy', 'Multiple interchangeable algorithms', 'Fixed, never-changing behavior', 'OCP, SRP, LSP, DIP'],
        ['Behavioral', 'Observer', 'One-to-many notification', 'Tight coupling, performance concerns', 'OCP, SRP, DIP, LSP'],
        ['Behavioral', 'Command', 'Undo/redo, queuing, logging', 'Simple method calls', 'SRP, OCP, DIP'],
        ['Behavioral', 'Template Method', 'Fixed algorithm structure, variable steps', 'Frequently changing structure', 'OCP, LSP, SRP'],
        ['Behavioral', 'Chain of Responsibility', 'Dynamic handler composition', 'Fixed, never-changing chain', 'SRP, OCP, DIP'],
        ['Behavioral', 'State', 'Behavior changes with internal state', 'Simple behavior variation, well-defined transitions absent', 'SRP, OCP, LSP'],
        ['Behavioral', 'Iterator', 'Custom collection traversal without exposing internals', 'Just consuming standard JDK collections/streams', 'OCP, ISP'],
        ['Behavioral', 'Mediator', 'Tangled many-to-many object communication', 'Few, simple interactions', 'OCP, LSP, LoD'],
        ['Behavioral', 'Memento', 'Undo/snapshot when inverse operations are impractical', 'Large, frequent snapshots without a delta strategy', 'OCP'],
        ['Behavioral', 'Visitor', 'Adding operations to a stable, open hierarchy', 'Closed hierarchy on Java 17+ — prefer sealed + pattern matching', 'OCP, LSP'],
        ['Behavioral', 'Interpreter', 'Evaluating a small, stable grammar', 'Anything beyond trivial — use a parser library instead', 'OCP'],
        ['Beyond GoF', 'Dependency Injection', 'Any class with a non-trivial collaborator', 'Tiny, self-contained utilities with nothing to swap', 'DIP'],
        ['Beyond GoF', 'Null Object', 'Optional collaborator whose absence should be a no-op', 'Absence is meaningful — use Optional instead', 'LSP, OCP']
      ]
    },

    // ============================================================
    // CONCLUSION
    // ============================================================
    {
      type: 'callout',
      tone: 'success',
      title: 'Architectural Summary',
      content: 'Design patterns are **proven solutions**, not silver bullets. This masterclass covers the complete 23-pattern Gang-of-Four catalog — all five Creational, all seven Structural, and all eleven Behavioral patterns — plus Dependency Injection and Null Object, the two everyday enterprise patterns the original catalog predates. Master them by understanding the problems they solve, the trade-offs they introduce, and the contexts where they apply. Start with SOLID, KISS, YAGNI, and Law of Demeter — they are the foundation every pattern builds upon. In modern Java, lambda expressions, method references, records, sealed classes, and pattern matching have changed how we implement many patterns — but the *intent* remains the same. The best developers don\'t memorize patterns; they recognize when a pattern *emerges* from the code and apply it to make the system simpler, more flexible, and easier to maintain. Patterns are a means to an end — and that end is **clean, maintainable, evolvable code**.'
    }
  ],
  explanation: 'A comprehensive, enterprise-grade masterclass on object-oriented design patterns in Java. Covers SOLID, KISS, YAGNI, and Law of Demeter principles. Includes the complete Gang-of-Four catalog: Creational patterns (Singleton, Builder, Factory Method, Abstract Factory, Prototype), Structural patterns (Adapter, Decorator, Proxy, Facade, Composite, Bridge, Flyweight), and Behavioral patterns (Strategy, Observer, Command, Template Method, Chain of Responsibility, State, Iterator, Mediator, Memento, Visitor, Interpreter) — plus the everyday enterprise patterns Dependency Injection and Null Object. Every pattern includes which SOLID principles it applies, when to use, how to use, and when NOT to use, with memorable real-world examples. Also includes a dedicated section mapping classic patterns to modern Java features (records, sealed classes, pattern matching, lambdas), a pattern decision tree, and an anti-pattern checklist.',
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod']
  }
});

export default problem;